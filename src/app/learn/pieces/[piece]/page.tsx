'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InteractiveDemo from '@/components/InteractiveDemo';
import { pieceTutorials } from '@/data/tutorials';
import { ChevronLeft, ChevronRight, Target, Move, Lightbulb } from 'lucide-react';

interface PageProps {
  params: Promise<{ piece: string }>;
}

export default function PiecePage({ params }: PageProps) {
  const { piece: pieceSlug } = use(params);

  const pieceIndex = pieceTutorials.findIndex(p => p.slug === pieceSlug);
  const piece = pieceTutorials[pieceIndex];

  if (!piece) {
    notFound();
  }

  const prevPiece = pieceIndex > 0 ? pieceTutorials[pieceIndex - 1] : null;
  const nextPiece = pieceIndex < pieceTutorials.length - 1 ? pieceTutorials[pieceIndex + 1] : null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-wood-950 text-wood-100">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/learn/pieces"
          className="inline-flex items-center gap-2 text-sm text-wood-400 hover:text-wood-300 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> 返回棋子總覽
        </Link>

        {/* 標題區域 */}
        <div className="flex items-center gap-6 mb-12 animate-fade-in">
          <div className="w-20 h-20 flex items-center justify-center text-6xl bg-gradient-to-br from-wood-800 to-wood-900 rounded-2xl shadow-xl border border-wood-700 text-wood-400">
            {piece.symbol}
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-wood-200 to-wood-400 mb-2">
              {piece.name}
            </h1>
            <p className="text-wood-300 text-lg max-w-2xl">{piece.description}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* 棋盤展示區 */}
          <div className="space-y-12">
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-wood-900/50 p-1 rounded-2xl border border-wood-700 shadow-2xl">
                <InteractiveDemo
                  fen={piece.initialPosition}
                  highlightSquares={piece.highlightSquares}
                  description="金色標示為可移動位置"
                />
              </div>
              <p className="text-sm text-wood-400 mt-3 text-center">
                長按棋子可查看所有合法走法
              </p>
            </div>

            {/* 練習區塊 - 僅在有設置時顯示 */}
            {piece.practicePosition && piece.practiceTarget && (
              <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2 mb-4 text-wood-400 font-bold">
                  <Target className="w-5 h-5" />
                  <h2>實戰練習</h2>
                </div>
                <div className="bg-wood-900/50 p-6 rounded-2xl border border-wood-700 hover:border-wood-500/50 transition-colors">
                  <p className="text-wood-300 mb-6">
                    任務：使用 {piece.name} 吃掉敵方棋子
                  </p>
                  <div className="max-w-[400px] mx-auto">
                    <InteractiveDemo
                      fen={piece.practicePosition}
                      allowMoves={true}
                      practiceTargets={piece.practiceTarget}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 說明區 */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-wood-900/30 p-8 rounded-2xl border border-wood-700 backdrop-blur-sm hover:bg-wood-900/50 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-wood-800 rounded-lg text-wood-400">
                  <Move className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-wood-100">移動規則</h2>
              </div>

              <ul className="space-y-4">
                {piece.movement.map((rule, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-xl bg-wood-950/50 border border-wood-800/50 hover:border-wood-700 transition-colors">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-wood-800 text-wood-400 text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-wood-200 leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-wood-500/10 to-transparent p-8 rounded-2xl border border-wood-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-wood-400/10 rounded-lg text-wood-400">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-wood-100">戰術技巧</h2>
              </div>

              <ul className="space-y-4">
                {piece.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-wood-200">
                    <span className="text-wood-400 mt-1.5">•</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 底部導航 */}
        <div className="flex justify-between mt-20 pt-8 border-t border-wood-800">
          {prevPiece ? (
            <Link
              href={`/learn/pieces/${prevPiece.slug}`}
              className="group flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-wood-900 transition-colors"
            >
              <span className="text-xs text-wood-400 flex items-center gap-1 group-hover:text-wood-300 transition-colors">
                <ChevronLeft className="w-3 h-3" /> 上一個棋子
              </span>
              <span className="text-lg font-bold text-wood-100 group-hover:translate-x-1 transition-transform">
                {prevPiece.symbol} {prevPiece.name}
              </span>
            </Link>
          ) : (
            <div></div>
          )}

          {nextPiece ? (
            <Link
              href={`/learn/pieces/${nextPiece.slug}`}
              className="group flex flex-col items-end gap-1 p-4 rounded-xl hover:bg-wood-900 transition-colors"
            >
              <span className="text-xs text-wood-400 flex items-center gap-1 group-hover:text-wood-300 transition-colors">
                下一個棋子 <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-lg font-bold text-wood-100 group-hover:-translate-x-1 transition-transform">
                {nextPiece.name} {nextPiece.symbol}
              </span>
            </Link>
          ) : (
            <Link
              href="/learn/special"
              className="group flex flex-col items-end gap-1 p-4 rounded-xl hover:bg-wood-900 transition-colors"
            >
              <span className="text-xs text-wood-400 flex items-center gap-1 group-hover:text-wood-300 transition-colors">
                進階課程 <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-lg font-bold text-wood-100 group-hover:-translate-x-1 transition-transform">
                特殊規則
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
