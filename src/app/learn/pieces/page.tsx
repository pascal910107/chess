import Link from 'next/link';
import { pieceTutorials } from '@/data/tutorials';
import { ChevronLeft, ArrowRight } from 'lucide-react';

export default function PiecesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background text-foreground">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" /> 返回教學
        </Link>

        <div className="mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            棋子走法
          </h1>
          <p className="text-muted-foreground text-lg">掌握每一種棋子的獨特力量</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pieceTutorials.map((piece, index) => (
            <Link
              key={piece.slug}
              href={`/learn/pieces/${piece.slug}`}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 flex items-center justify-center text-4xl bg-background rounded-xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 border border-border">
                    {piece.symbol}
                  </div>
                  <div className="p-2 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" aria-hidden="true">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {piece.name}
                </h2>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 line-clamp-2 leading-relaxed">
                  {piece.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-between mt-16 pt-8 border-t border-border">
          <Link
            href="/learn/basics"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span>基礎規則</span>
          </Link>
          <Link
            href="/learn/special"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>特殊規則</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
