'use client';

import { Hero } from '@/components/pages/home/hero';
import { About } from '@/components/pages/home/about';
import { Team } from '@/components/pages/home/team';
import { GDGSection } from '@/components/pages/home/gdg';
import { CTASection } from '@/components/pages/home/cta';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Hero />
      <div className="space-y-24 pb-24">
        <About />
        <GDGSection />
        <Team />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
}
