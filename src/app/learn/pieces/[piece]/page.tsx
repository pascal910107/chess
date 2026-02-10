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
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/learn/pieces"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> 返回棋子總覽
        </Link>

        {/* 標題區域 */}
        <div className="flex items-center gap-4 md:gap-6 mb-12 animate-fade-in">
          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-4xl md:text-5xl bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg border border-border text-primary-foreground shrink-0 leading-none">
            <span className="-translate-y-0.5">{piece.symbol}</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground mb-1">
              {piece.name}
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg">{piece.description}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* 棋盤展示區 */}
          <div className="space-y-12">
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-card p-1 rounded-2xl border border-border shadow-2xl">
                <InteractiveDemo
                  fen={piece.initialPosition}
                  highlightSquares={piece.highlightSquares}
                  description="青綠色標示為可移動位置"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                長按棋子可查看所有合法走法
              </p>
            </div>

            {/* 練習區塊 - 僅在有設置時顯示 */}
            {piece.practicePosition && piece.practiceTarget && (
              <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                  <Target className="w-5 h-5" />
                  <h2>實戰練習</h2>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors">
                  <p className="text-muted-foreground mb-6">
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
            <div className="bg-card/50 p-8 rounded-2xl border border-border backdrop-blur-sm hover:bg-card/80 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Move className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">移動規則</h2>
              </div>

              <ul className="space-y-4">
                {piece.movement.map((rule, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-foreground leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-transparent p-8 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">戰術技巧</h2>
              </div>

              <ul className="space-y-4">
                {piece.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="text-primary mt-1.5">•</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 底部導航 */}
        <div className="flex justify-between mt-20 pt-8 border-t border-border">
          {prevPiece ? (
            <Link
              href={`/learn/pieces/${prevPiece.slug}`}
              className="group flex flex-col items-start gap-1 p-4 rounded-xl hover:bg-card transition-colors"
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors">
                <ChevronLeft className="w-3 h-3" /> 上一個棋子
              </span>
              <span className="text-lg font-bold text-foreground group-hover:translate-x-1 transition-transform">
                {prevPiece.symbol} {prevPiece.name}
              </span>
            </Link>
          ) : (
            <div></div>
          )}

          {nextPiece ? (
            <Link
              href={`/learn/pieces/${nextPiece.slug}`}
              className="group flex flex-col items-end gap-1 p-4 rounded-xl hover:bg-card transition-colors"
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors">
                下一個棋子 <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-lg font-bold text-foreground group-hover:-translate-x-1 transition-transform">
                {nextPiece.name} {nextPiece.symbol}
              </span>
            </Link>
          ) : (
            <Link
              href="/learn/special"
              className="group flex flex-col items-end gap-1 p-4 rounded-xl hover:bg-card transition-colors"
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors">
                進階課程 <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-lg font-bold text-foreground group-hover:-translate-x-1 transition-transform">
                特殊規則
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
