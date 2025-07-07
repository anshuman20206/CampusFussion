import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { COMMUNITY_LINKS, TEAM_MEMBERS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Join Our Community</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Connect with fellow developers, share your projects, and grow together. Our community is the heart of CampusConnect.
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
                <Link href={item.link}>
                  {item.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center md:mt-24">
        <h2 className="text-3xl font-bold tracking-tight">Member Highlights</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Meet some of the talented members of our community.
        </p>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto mt-12 w-full max-w-xs sm:max-w-xl lg:max-w-4xl"
        >
          <CarouselContent>
            {TEAM_MEMBERS.map((member, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <Image
                        src={member.image}
                        data-ai-hint={member.dataAiHint}
                        alt={`Photo of ${member.name}`}
                        width={80}
                        height={80}
                        className="mb-4 rounded-full"
                      />
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
