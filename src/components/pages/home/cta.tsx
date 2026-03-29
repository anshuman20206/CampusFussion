import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export function CTASection() {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="relative overflow-hidden hero-gradient rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md shadow-xl">
            <Rocket className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Ready to join Campus Fusion?</h2>
          <p className="text-xl text-indigo-100 font-medium">
            Take the first step towards a more connected and opportunity-rich campus life. Sign up today and unlock your future.
          </p>
          <div className="pt-4">
            <Button size="lg" variant="secondary" asChild className="rounded-2xl h-14 px-12 font-bold shadow-2xl hover:scale-105 transition-all">
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
