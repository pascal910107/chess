import Link from 'next/link';
import { BookOpen, Crown, Star, ChevronRight } from 'lucide-react';

const sections = [
  { href: '/learn/basics', title: '基礎規則', desc: '棋盤佈局、基本觀念與遊戲目標', icon: <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" /> },
  { href: '/learn/pieces', title: '棋子走法', desc: '國王、皇后、車、馬、象、兵的移動方式', icon: <Crown className="w-5 h-5 text-primary" aria-hidden="true" /> },
  { href: '/learn/special', title: '特殊規則', desc: '王車易位、吃過路兵與兵的升變', icon: <Star className="w-5 h-5 text-primary" aria-hidden="true" /> },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            西洋棋教學
          </h1>
          <p className="text-muted-foreground">從零開始掌握這項王者的運動</p>
        </div>

        <div className="grid gap-4">
          {sections.map(section => (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center gap-6 p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
            >
              <div className="p-3 rounded-lg bg-background border border-border group-hover:border-primary/30 transition-colors">
                {section.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-1">
                  {section.title}
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                  {section.desc}
                </div>
              </div>
              <div className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true">
                <ChevronRight className="w-6 h-6" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-6">準備好實戰了嗎？</p>
          <Link
            href="/play"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium tracking-wide transition-all shadow-lg shadow-primary/20"
          >
            <span>開始對弈</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
