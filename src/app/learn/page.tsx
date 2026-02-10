import Link from 'next/link';
import { BookOpen, Crown, Star, ChevronRight } from 'lucide-react';

const sections = [
  { href: '/learn/basics', title: '基礎規則', desc: '棋盤佈局、基本觀念與遊戲目標', icon: <BookOpen className="w-5 h-5 text-wood-400" /> },
  { href: '/learn/pieces', title: '棋子走法', desc: '國王、皇后、車、馬、象、兵的移動方式', icon: <Crown className="w-5 h-5 text-wood-400" /> },
  { href: '/learn/special', title: '特殊規則', desc: '王車易位、吃過路兵與兵的升變', icon: <Star className="w-5 h-5 text-wood-400" /> },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-wood-950 text-wood-100">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-wood-200 to-wood-400">
            西洋棋教學
          </h1>
          <p className="text-wood-300">從零開始掌握這項王者的運動</p>
        </div>

        <div className="grid gap-4">
          {sections.map(section => (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center gap-6 p-6 rounded-xl bg-wood-900/50 border border-wood-700 hover:border-wood-500/50 hover:bg-wood-800 transition-all duration-300 group"
            >
              <div className="p-3 rounded-lg bg-wood-950 border border-wood-700 group-hover:border-wood-500/30 transition-colors">
                {section.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg text-wood-100 group-hover:text-wood-400 transition-colors mb-1">
                  {section.title}
                </div>
                <div className="text-sm text-wood-400 group-hover:text-wood-300 transition-colors">
                  {section.desc}
                </div>
              </div>
              <div className="text-wood-500 group-hover:text-wood-400 group-hover:translate-x-1 transition-all">
                <ChevronRight className="w-6 h-6" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-wood-800 text-center">
          <p className="text-wood-400 mb-6">準備好實戰了嗎？</p>
          <Link
            href="/play"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-wood-500 to-wood-600 hover:from-wood-400 hover:to-wood-500 text-wood-950 rounded-lg font-medium tracking-wide transition-all shadow-lg shadow-wood-900/30"
          >
            <span>開始對弈</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
