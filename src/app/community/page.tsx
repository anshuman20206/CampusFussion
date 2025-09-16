import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { COMMUNITY_CLUBS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Community Hub</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Choose a community to join the conversation, share your ideas, questions, or random thoughts. All anonymous.
        </p>
      </div>

      <div className="mt-12 mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {COMMUNITY_CLUBS.map((club) => (
          <Card key={club.id} className="group flex flex-col transition-all duration-300 hover:border-primary hover:shadow-primary/20">
             <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <club.icon className="h-7 w-7" />
                </div>
                <CardTitle>{club.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{club.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Link href={`/community/${club.id}`} className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Join Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
