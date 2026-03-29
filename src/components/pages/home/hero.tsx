
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient py-16 md:py-24 px-8">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-400/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-48 -right-24 w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="h-3 w-3" />
          <span>New Opportunities Just Posted</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
          Campus Fusion
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mb-10 leading-relaxed font-medium">
          Your Campus Opportunities Hub. Connect with internships, stay updated on events, and accelerate your career path with a dedicated student community.
        </p>
        <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" asChild className="rounded-xl shadow-xl shadow-indigo-900/20 font-bold px-10">
              <Link href="/internships">Explore Internships</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-10 font-bold">
              <Link href="/events">View Events</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
