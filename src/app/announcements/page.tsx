'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pin, Loader2, MessageCircle } from "lucide-react";

export default function AnnouncementsPage() {
  const firestore = useFirestore();
  const announcementsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'announcements'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: rawAnnouncements, isLoading } = useCollection(announcementsQuery);

  const announcements = rawAnnouncements ? [...rawAnnouncements].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  }) : [];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Community News</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Stay up-to-date with the latest news, updates, and opportunities from the CampusFusion community.
        </p>
      </div>

      <div className="mt-12 mx-auto max-w-3xl space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
        ) : (
          <>
            {announcements.map((announcement) => (
              <Card key={announcement.id} className={announcement.pinned ? "border-primary/50 shadow-lg bg-primary/5" : ""}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                      <CardDescription>
                        Posted on {announcement.createdAt?.toDate() ? new Date(announcement.createdAt.toDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}
                      </CardDescription>
                    </div>
                    {announcement.pinned && (
                      <Badge variant="default" className="flex items-center gap-1 shadow-sm">
                        <Pin className="h-3 w-3" />
                        Pinned
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
            {announcements.length === 0 && (
              <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                <h3 className="text-lg font-semibold">No news items yet</h3>
                <p className="text-muted-foreground">Check back soon for exciting updates!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
