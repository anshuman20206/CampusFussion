import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="bg-secondary/50">
      <div className="container py-20 text-center md:py-32">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Empowering Developers.
          <br />
          <span className="text-primary">Building Tech Communities.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          CampusConnect is the heart of student developer life, fostering collaboration and growth through events, AI assistance, and a strong affiliation with Google Developer Groups.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/signup">Join Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/events">Explore Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
