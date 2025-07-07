import { Hero } from '@/components/pages/home/hero';
import { About } from '@/components/pages/home/about';
import { Roadmap } from '@/components/pages/home/roadmap';
import { Team } from '@/components/pages/home/team';
import { AiBanner } from '@/components/pages/home/ai-banner';
import { Connect } from '@/components/pages/home/connect';

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
