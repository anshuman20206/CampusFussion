import { getThoughtsByClub } from '@/services/thoughts';
import { CommunityBoard } from '@/components/pages/community/community-board';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { COMMUNITY_CLUBS } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

interface CommunityClubPageProps {
  params: {
    clubId: string;
  };
}

export default async function CommunityClubPage({ params }: CommunityClubPageProps) {
  const { clubId } = params;
  const club = COMMUNITY_CLUBS.find((c) => c.id === clubId);

  if (!club) {
    notFound();
  }

  const { thoughts, error } = await getThoughtsByClub(clubId);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="relative text-center">
        <Button asChild variant="outline" className="absolute left-0 top-0">
          <Link href="/community">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Clubs
          </Link>
        </Button>
        <div className="flex justify-center items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <club.icon className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{club.name}</h1>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {club.description}
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-8 mx-auto max-w-3xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Firestore Connection Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <CommunityBoard initialThoughts={thoughts} clubId={clubId} />
    </div>
  );
}
