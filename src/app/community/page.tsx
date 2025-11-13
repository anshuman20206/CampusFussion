
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HardHat } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-lg">
            <HardHat className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="mt-4">Under Development</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The Community Wall is currently being rebuilt. Please check back later for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
