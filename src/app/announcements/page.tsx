import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ANNOUNCEMENTS } from "@/lib/constants";
import { Pin } from "lucide-react";

export default function AnnouncementsPage() {
  const sortedAnnouncements = [...ANNOUNCEMENTS].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Announcements</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Stay up-to-date with the latest news, updates, and opportunities from the CampusConnect community.
        </p>
      </div>

      <div className="mt-12 mx-auto max-w-3xl space-y-6">
        {sortedAnnouncements.map((announcement, index) => (
          <Card key={index} className={announcement.pinned ? "border-primary/50 shadow-lg" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{announcement.title}</CardTitle>
                  <CardDescription className="mt-2">
                    Posted on {new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </div>
                {announcement.pinned && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Pin className="h-3 w-3" />
                    Pinned
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
