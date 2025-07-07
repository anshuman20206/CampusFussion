import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COMMUNITY_LINKS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export function Connect() {
  return (
    <section id="connect" className="container mx-auto px-6 py-16 md:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Connect With Us</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join our active community channels to connect with fellow developers, share your projects, and grow together.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {COMMUNITY_LINKS.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle>{item.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
