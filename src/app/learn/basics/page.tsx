'use client';

import Link from 'next/link';
import { Chessboard } from 'react-chessboard';
import { basicsContent } from '@/data/tutorials';
import { BOARD_COLORS } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BasicsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" /> 返回教學
        </Link>

        <h1 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
          {basicsContent.title}
        </h1>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* 棋盤展示 */}
          <div>
            <div className="relative group w-full max-w-[360px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg blur opacity-50"></div>
              <div
                className="relative rounded-lg overflow-hidden shadow-lg border border-border select-none"
                style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                onContextMenu={(e) => e.preventDefault()}
              >
                <Chessboard
                  options={{
                    position: basicsContent.initialPosition,
                    allowDragging: false,
                    boardStyle: { borderRadius: '0' },
                    darkSquareStyle: { backgroundColor: BOARD_COLORS.dark },
                    lightSquareStyle: { backgroundColor: BOARD_COLORS.light },
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              初始擺放
            </p>
          </div>

          {/* 內容區 */}
          <div className="space-y-8">
            {basicsContent.sections.map((section, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border">
                <h2 className="font-bold text-lg mb-4 text-foreground">{section.title}</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 導航 */}
        <div className="flex justify-end mt-16 pt-8 border-t border-border">
          <Link
            href="/learn/pieces"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-card hover:bg-card/80 text-foreground hover:text-primary transition-all border border-border hover:border-primary/50 group"
          >
            <span>下一課：棋子走法</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
