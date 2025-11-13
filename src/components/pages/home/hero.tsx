import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative h-[70vh] w-full flex flex-col items-center justify-center text-center bg-transparent">
      <div className="z-10 container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
          Empowering Innovators.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          CampusFusion is your central hub for learning, collaborating, and building with the latest technologies. Join a vibrant community of student developers and turn your ideas into reality.
        </p>
        <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/events">Explore Events</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/community">Join Community</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
