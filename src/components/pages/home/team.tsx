import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TEAM_MEMBERS } from '@/lib/constants';

export function Team() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-black tracking-tight mb-4">Meet the Visionaries</h2>
        <p className="text-lg text-muted-foreground">
          The passionate leaders and organizers dedicated to building and scaling this student-first ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member) => (
          <Card key={member.name} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-card group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-20 group-hover:opacity-100 transition-opacity blur-lg" />
                <Image
                  src={member.image}
                  data-ai-hint={member.dataAiHint}
                  alt={member.name}
                  width={140}
                  height={140}
                  className="relative rounded-full border-4 border-background shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {member.description}
              </p>
              <Button variant="outline" size="icon" asChild className="rounded-xl hover:bg-primary hover:text-white transition-colors">
                <Link href={member.linkedin} target="_blank">
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
