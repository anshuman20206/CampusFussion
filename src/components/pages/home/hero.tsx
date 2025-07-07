'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Dynamically import the Canvas part, which is the true source of the client-side dependency
const HeroCanvas = dynamic(
  () => import('./hero-canvas').then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-transparent" />,
  }
);

export function Hero() {
  return (
    <section className="relative h-[80vh] w-full bg-transparent">
       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="text-6xl font-headline text-foreground drop-shadow-[0_0_10px_hsl(var(--primary))]">
          CampusConnect
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Empowering Innovators. Building The Future.
        </p>
      </div>
      
      <HeroCanvas />

       <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
          <Button size="lg" variant="outline" asChild>
              <Link href="/events">Explore Events</Link>
          </Button>
       </div>
    </section>
  );
}
