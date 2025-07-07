import { getThoughts } from '@/services/thoughts';
import { CommunityBoard } from '@/components/pages/community/community-board';

export const dynamic = 'force-dynamic';

export default async function CommunityPage() {
  const thoughts = await getThoughts();

  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Community Thoughts</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Share your ideas, questions, or random thoughts with the community. All anonymous.
        </p>
      </div>
      <CommunityBoard initialThoughts={thoughts} />
    </div>
  );
}
