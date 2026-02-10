import Link from 'next/link';
import { Crown, BookOpen, User, Zap, ArrowRight, ChevronRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Hero Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-accent/5 to-transparent" />
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-primary/10 border border-primary/30 animate-fade-in backdrop-blur-sm">
            <Star className="w-3 h-3 text-primary fill-primary" aria-hidden="true" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">Premium Chess Experience</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
            精通西洋棋的<br />
            <span className="text-primary ml-2">藝術</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            在優雅的環境中學習規則、提升策略。從零開始，逐步掌握這項王者之戲。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/play"
              className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium tracking-wide transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                開始對弈 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/learn"
              className="px-8 py-4 border border-border hover:border-primary bg-card/50 hover:bg-card text-foreground hover:text-primary rounded-lg font-medium tracking-wide transition-all duration-300 backdrop-blur-sm"
            >
              學習規則
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<User className="w-8 h-8 text-primary" aria-hidden="true" />}
              title="本地對弈"
              description="與朋友在同一裝置上進行對局，享受面對面的競技樂趣。"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-primary" aria-hidden="true" />}
              title="完整教程"
              description="從棋子走法到戰術策略，循序漸進的繁體中文教學課程。"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-primary" aria-hidden="true" />}
              title="互動練習"
              description="透過實際操作棋盤來鞏固所學，即時反饋加速學習成效。"
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative py-24 px-4 bg-muted/30 border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center text-foreground">快速開始</h2>
          <div className="grid gap-4">
            <QuickLink href="/learn/basics" title="基礎規則" subtitle="了解棋盤與勝負條件" icon={<BookOpen className="w-5 h-5" aria-hidden="true" />} />
            <QuickLink href="/learn/pieces" title="棋子走法" subtitle="掌握六種棋子的獨特移動方式" icon={<Crown className="w-5 h-5" aria-hidden="true" />} />
            <QuickLink href="/learn/special" title="特殊規則" subtitle="王車易位、吃過路兵與升變" icon={<Star className="w-5 h-5" aria-hidden="true" />} />
            <QuickLink href="/play" title="直接對弈" subtitle="立即開始一局新的遊戲" icon={<Zap className="w-5 h-5" aria-hidden="true" />} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-border bg-background">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <Crown className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-medium">西洋棋教室</span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Chess Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group shadow-sm">
      <div className="mb-6 p-4 rounded-xl bg-background border border-border inline-block shadow-md group-hover:scale-110 group-hover:shadow-primary/10 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function QuickLink({ href, title, subtitle, icon }: { href: string; title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-6 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group shadow-sm"
    >
      <div className="p-3 rounded-lg bg-background text-muted-foreground group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{subtitle}</p>
      </div>
      <div className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </div>
    </Link>
  );
}
