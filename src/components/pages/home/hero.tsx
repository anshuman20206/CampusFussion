import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative h-[80vh] w-full flex flex-col items-center justify-center text-center bg-transparent">
      <div className="z-10">
        <h1 className="text-6xl font-headline text-foreground drop-shadow-[0_0_10px_hsl(var(--primary))]">
          CampusConnect
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Empowering Innovators. Building The Future.
        </p>
        <div className="mt-8">
            <Button size="lg" variant="outline" asChild>
            <Link href="/events">Explore Events</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
