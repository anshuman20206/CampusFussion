import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient py-24 md:py-32 px-8">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-400/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-48 -right-24 w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="h-4 w-4" />
          <span>One Platform for Campus Opportunities</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 drop-shadow-sm">
          Campus Fusion
        </h1>
        <p className="text-xl md:text-2xl text-indigo-50 max-w-3xl mx-auto mb-12 leading-relaxed font-medium opacity-90">
          Unlock your potential with Campus Fusion. The ultimate hub for internships, workshops, and student networking designed to bridge the gap between education and career.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
            <Button size="lg" variant="secondary" asChild className="rounded-2xl shadow-2xl shadow-indigo-950/20 font-bold px-10 h-14 hover:scale-105 transition-all">
              <Link href="/internships">Explore Internships</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-2xl border-white/40 text-white hover:bg-white/10 backdrop-blur-sm px-10 h-14 font-bold hover:scale-105 transition-all">
              <Link href="/events">Explore Events</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
