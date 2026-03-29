import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient py-24 md:py-40 px-8 min-h-[90vh] flex items-center justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-violet-600/10 rounded-full blur-[180px]" />
        <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] bg-primary/20 rounded-full blur-[160px] animate-glow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 text-white text-xs font-black uppercase tracking-[0.2em] backdrop-blur-xl mb-10 border border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Sparkles className="h-4 w-4 text-accent" />
          <span>Next Generation Community Hub</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-headline font-black tracking-tight text-white mb-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] leading-[0.85] animate-in zoom-in duration-700">
          Campus <span className="text-indigo-200">Fusion</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-indigo-50 max-w-3xl mx-auto mb-16 leading-relaxed font-medium opacity-90 drop-shadow-md">
          A centralized digital ecosystem designed to empower student growth. Bridge the gap between education and career with curated opportunities and community-led innovation.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 animate-in fade-in zoom-in duration-1000 delay-300">
            <Button size="lg" variant="secondary" asChild className="rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] font-black px-12 h-16 hover:scale-105 transition-all text-primary active:scale-95 group">
              <Link href="/internships" className="flex items-center gap-2">
                Explore Internships
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-2xl border-white/30 text-white hover:bg-white/10 backdrop-blur-xl px-12 h-16 font-black hover:scale-105 transition-all active:scale-95">
              <Link href="/events" className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Explore Events
              </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
