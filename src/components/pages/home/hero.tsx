import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="bg-transparent">
      <div className="container relative py-24 text-center md:py-40">
        <div 
          className="absolute -inset-16 z-0 opacity-20 dark:opacity-30" 
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1), transparent 70%)'
          }}
        />
        <div className="relative z-10">
          <h1 
            className="text-5xl font-bold tracking-tighter md:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60"
            style={{ textShadow: '0 0 20px hsl(var(--primary) / 0.5)' }}
          >
            Empowering Innovators.
            <br />
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
            >
              Building The Future.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground font-body">
            CampusConnect is the heart of student developer life, fostering collaboration and growth through events, AI assistance, and a strong affiliation with Google Developer Groups.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" variant="outline" asChild>
              <Link href="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
