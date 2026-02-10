'use client';

import Link from 'next/link';
import { Chessboard } from 'react-chessboard';
import { basicsContent } from '@/data/tutorials';
import { BOARD_COLORS } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BasicsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-wood-950 text-wood-100">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-wood-400 hover:text-wood-300 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> 返回教學
        </Link>

        <h1 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-wood-200 to-wood-400">
          {basicsContent.title}
        </h1>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* 棋盤展示 */}
          <div>
            <div className="relative group w-full max-w-[360px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-wood-400/20 to-wood-600/20 rounded-lg blur opacity-100"></div>
              <div className="relative rounded-lg overflow-hidden shadow-lg border border-wood-700 bg-wood-800">
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
            <p className="text-xs text-wood-400 mt-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-wood-400"></span>
              初始擺放
            </p>
          </div>

          {/* 內容區 */}
          <div className="space-y-8">
            {basicsContent.sections.map((section, index) => (
              <div key={index} className="bg-wood-900/50 p-6 rounded-xl border border-wood-700">
                <h2 className="font-bold text-lg mb-4 text-wood-100">{section.title}</h2>
                <ul className="space-y-3 text-wood-300">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <span className="w-1.5 h-1.5 mt-2 rounded-full bg-wood-500 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 導航 */}
        <div className="flex justify-end mt-16 pt-8 border-t border-wood-800">
          <Link
            href="/learn/pieces"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-wood-900 hover:bg-wood-800 text-wood-200 hover:text-white transition-all border border-wood-700 hover:border-wood-500/50 group"
          >
            <span>下一課：棋子走法</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
