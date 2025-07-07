import { getThoughts } from '@/services/thoughts';
import { CommunityBoard } from '@/components/pages/community/community-board';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CommunityPage() {
  const { thoughts, error } = await getThoughts();

  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Community Thoughts</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Share your ideas, questions, or random thoughts with the community. All anonymous.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-8 mx-auto max-w-3xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Firestore Connection Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <CommunityBoard initialThoughts={thoughts} />
    </div>
  );
}
