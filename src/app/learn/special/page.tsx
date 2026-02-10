'use client';

import Link from 'next/link';
import { Chessboard } from 'react-chessboard';
import { specialRules } from '@/data/tutorials';
import { BOARD_COLORS } from '@/lib/constants';
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';

export default function SpecialRulesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" /> 返回教學
        </Link>

        {/* Header */}
        <div className="mb-16 text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/30">
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">進階大師之路</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            特殊規則
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            掌握這些關鍵規則，讓你的對局更具深度與策略
          </p>
        </div>

        <div className="space-y-24">
          {specialRules.map((rule, index) => (
            <div
              key={rule.slug}
              className="group grid gap-12 lg:grid-cols-2 items-center animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* 說明區 */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-card text-primary font-bold text-xl shadow-md border border-border group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{rule.name}</h2>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed border-l-4 border-primary/50 pl-4">
                  {rule.description}
                </p>

                <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
                  <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4" aria-hidden="true" /> 規則詳解
                  </h3>
                  <ul className="space-y-3">
                    {rule.explanation.map((item, i) => (
                      <li key={i} className="flex gap-3 text-foreground/90 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 棋盤展示 */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative transform group-hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-full max-w-[320px] mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-border">
                    <Chessboard
                      options={{
                        position: rule.demoPosition,
                        allowDragging: false,
                        boardStyle: { borderRadius: '0' },
                        darkSquareStyle: { backgroundColor: BOARD_COLORS.dark },
                        lightSquareStyle: { backgroundColor: BOARD_COLORS.light },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 完成區塊 */}
        <div className="mt-32 text-center animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="inline-block p-8 rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <h3 className="text-2xl font-bold text-foreground mb-4">恭喜！你已經掌握了所有規則</h3>
            <p className="text-muted-foreground mb-8">現在，展現你實力的時候到了</p>

            <Link
              href="/play"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold text-lg tracking-wide transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
            >
              <span>開始對弈</span>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 底部導航 */}
        <div className="flex justify-start mt-20 pt-8 border-t border-border">
          <Link
            href="/learn/pieces"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>返回棋子走法</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
