
import { getThoughts } from '@/services/thoughts';
import { CommunityBoard } from '@/components/pages/community/community-board';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

async function ThoughtsFeed() {
  const { thoughts, error } = await getThoughts();

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8 mx-auto max-w-3xl">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Firestore Connection Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return <CommunityBoard initialThoughts={thoughts} />;
}


export default function CommunityPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Community Wall</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join the conversation, share your ideas, questions, or random thoughts with the community.
        </p>
      </div>

      <Suspense fallback={<p className="text-center mt-8">Loading thoughts...</p>}>
        <ThoughtsFeed />
      </Suspense>
    </div>
  );
}
