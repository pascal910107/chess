This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## AI 棋局問答助手

在對弈頁面 `/play` 內建 AI 助手，可以即時詢問關於當前棋局的問題。

### 設定 Gemini API Key

1. 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登入 Google 帳號
3. 點擊「Create API Key」建立新的 API Key
4. 複製 API Key
5. 在專案根目錄建立 `.env.local` 檔案：
   ```
   GEMINI_API_KEY=你的_API_Key
   GEMINI_MODEL=gemini-2.5-flash  # 可選，預設 gemini-2.5-flash
   ```

### 功能說明

- **快速提問按鈕**：一鍵詢問常見問題
  - 目前誰佔優勢？
  - 我應該怎麼走？
  - 對手在威脅什麼？
  - 解釋最後一步棋
- **自由提問**：輸入任何關於棋局的問題
- **即時串流回應**：AI 回覆會即時顯示

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
