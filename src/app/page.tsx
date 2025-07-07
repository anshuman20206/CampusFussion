import { Hero } from '@/components/pages/home/hero';
import { About } from '@/components/pages/home/about';
import { Roadmap } from '@/components/pages/home/roadmap';
import { Team } from '@/components/pages/home/team';
import { AiBanner } from '@/components/pages/home/ai-banner';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Roadmap />
      <Team />
      <AiBanner />
    </div>
  );
}
