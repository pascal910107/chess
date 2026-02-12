import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { fen, moveHistory, turn, question } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: '未設定 GEMINI_API_KEY 環境變數' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `你是西洋棋教練，用繁體中文回答。

規則：
- 直接回答，不要寒暄或開場白
- 最多 3 句話，除非問題需要更多說明
- 使用中文棋子名（國王、皇后、城堡、主教、騎士、兵）
- 若問題與棋局無關，簡短回「請問棋局相關的問題」

棋局：
FEN: ${fen}
記錄: ${moveHistory || '無'}
輪到: ${turn === 'w' ? '白方' : '黑方'}`;

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContentStream({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\n使用者問題：' + question }] }
      ],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);

    const errorMessage = error instanceof Error ? error.message : '';
    if (errorMessage.includes('429') || errorMessage.includes('quota')) {
      return new Response(
        JSON.stringify({ error: 'API 配額已用完，請稍後再試' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: '發生錯誤，請稍後再試' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
