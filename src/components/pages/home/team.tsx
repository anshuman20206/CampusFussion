import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TEAM_MEMBERS } from '@/lib/constants';

export function Team() {
  return (
    <section id="team" className="container py-16 text-center md:py-24">
      <h2 className="text-3xl font-bold tracking-tight">Meet the Team</h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        The passionate individuals dedicated to building and growing our community.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member) => (
          <Card key={member.name} className="overflow-hidden text-center">
            <CardContent className="p-6">
              <Image
                src={member.image}
                data-ai-hint={member.dataAiHint}
                alt={`Photo of ${member.name}`}
                width={120}
                height={120}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
              <Button variant="ghost" size="icon" asChild className="mt-2">
                <Link href={member.linkedin} target="_blank" aria-label={`${member.name}'s LinkedIn`}>
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
