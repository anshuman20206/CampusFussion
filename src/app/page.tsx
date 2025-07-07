'use client';

import dynamic from 'next/dynamic';
import { About } from '@/components/pages/home/about';
import { Roadmap } from '@/components/pages/home/roadmap';
import { Team } from '@/components/pages/home/team';
import { AiBanner } from '@/components/pages/home/ai-banner';
import { Connect } from '@/components/pages/home/connect';

const Hero = dynamic(
  () => import('@/components/pages/home/hero').then((mod) => mod.Hero),
  {
    ssr: false,
    loading: () => <div className="relative h-[80vh] w-full bg-transparent" />,
  }
);

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-6">
        <About />
        <Roadmap />
        <Team />
        <Connect />
        <AiBanner />
      </div>
    </div>
  );
}
