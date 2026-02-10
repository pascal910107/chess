import Link from 'next/link';
import { Crown, BookOpen, User, Zap, ArrowRight, ChevronRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-wood-950 text-wood-50 selection:bg-wood-400/30">
      {/* Hero Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-wood-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-wood-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-4 z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-wood-400/10 border border-wood-400/30 animate-fade-in backdrop-blur-sm">
            <Star className="w-3 h-3 text-wood-400 fill-wood-400" />
            <span className="text-xs font-medium text-wood-400 tracking-wide uppercase">Premium Chess Experience</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-wood-50 to-wood-300">
            精通西洋棋的<br />
            <span className="text-wood-400 ml-2">藝術</span>
          </h1>

          <p className="text-lg md:text-xl text-wood-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            在優雅的環境中學習規則、提升策略。從零開始，逐步掌握這項王者之戲。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/play"
              className="group relative px-8 py-4 bg-gradient-to-r from-wood-500 to-wood-600 hover:from-wood-400 hover:to-wood-500 text-wood-950 rounded-lg font-medium tracking-wide transition-all duration-300 shadow-lg shadow-wood-900/30 hover:shadow-wood-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                開始對弈 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/learn"
              className="px-8 py-4 border border-wood-700 hover:border-wood-500 bg-wood-900/50 hover:bg-wood-800 text-wood-200 hover:text-white rounded-lg font-medium tracking-wide transition-all duration-300 backdrop-blur-sm"
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
              icon={<User className="w-8 h-8 text-wood-400" />}
              title="本地對弈"
              description="與朋友在同一裝置上進行對局，享受面對面的競技樂趣。"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-wood-400" />}
              title="完整教程"
              description="從棋子走法到戰術策略，循序漸進的繁體中文教學課程。"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-wood-400" />}
              title="互動練習"
              description="透過實際操作棋盤來鞏固所學，即時反饋加速學習成效。"
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="relative py-24 px-4 bg-wood-900/30 border-t border-wood-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center text-wood-100">快速開始</h2>
          <div className="grid gap-4">
            <QuickLink href="/learn/basics" title="基礎規則" subtitle="了解棋盤與勝負條件" icon={<BookOpen className="w-5 h-5" />} />
            <QuickLink href="/learn/pieces" title="棋子走法" subtitle="掌握六種棋子的獨特移動方式" icon={<Crown className="w-5 h-5" />} />
            <QuickLink href="/learn/special" title="特殊規則" subtitle="王車易位、吃過路兵與升變" icon={<Star className="w-5 h-5" />} />
            <QuickLink href="/play" title="直接對弈" subtitle="立即開始一局新的遊戲" icon={<Zap className="w-5 h-5" />} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-wood-800 bg-wood-950">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <Crown className="w-4 h-4" />
          <span className="text-sm font-medium">西洋棋教室</span>
        </div>
        <p className="text-xs text-wood-600">
          &copy; {new Date().getFullYear()} Chess Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-wood-900/50 border border-wood-700 hover:border-wood-400/50 hover:bg-wood-800/80 transition-all duration-300 group">
      <div className="mb-6 p-4 rounded-xl bg-wood-950 border border-wood-700 inline-block shadow-lg group-hover:scale-110 group-hover:shadow-wood-500/10 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-wood-100 group-hover:text-wood-400 transition-colors">{title}</h3>
      <p className="text-wood-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function QuickLink({ href, title, subtitle, icon }: { href: string; title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-6 p-6 rounded-xl bg-wood-800/40 border border-wood-700/50 hover:bg-wood-800 hover:border-wood-400/50 transition-all duration-300 group"
    >
      <div className="p-3 rounded-lg bg-wood-900 text-wood-300 group-hover:text-wood-400 group-hover:bg-wood-950 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-wood-100 group-hover:text-wood-400 transition-colors">{title}</h3>
        <p className="text-sm text-wood-400 group-hover:text-wood-300 transition-colors">{subtitle}</p>
      </div>
      <div className="text-wood-500 group-hover:text-wood-400 group-hover:translate-x-1 transition-all duration-300">
        <ChevronRight className="w-5 h-5" />
      </div>
    </Link>
  );
}
