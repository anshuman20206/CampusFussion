
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, PlusCircle, Loader2, Pin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ManageAnnouncementsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const q = useMemoFirebase(() => firestore ? query(collection(firestore, 'announcements'), orderBy('createdAt', 'desc')) : null, [firestore]);
  const { data: announcements, isLoading } = useCollection(q);

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("CRITICAL: Delete this news broadcast?")) return;
    try {
      await deleteDoc(doc(firestore, 'announcements', id));
      toast({ title: "Broadcast Removed", description: "Successfully deleted the news item." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manage News Feed</h1>
          <p className="text-muted-foreground">Broadcast updates and manage community announcements.</p>
        </div>
        <Button asChild className="rounded-xl font-bold h-12 shadow-lg hover:shadow-primary/25">
          <Link href="/admin/add-announcement">
            <PlusCircle className="mr-2 h-5 w-5" />
            Publish New Broadcast
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle>Broadcast History</CardTitle>
          <CardDescription>Live feed of all community news updates.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
          ) : (
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Headline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements?.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-bold text-foreground">
                        <div className="flex items-center gap-2">
                          {item.pinned && <Pin className="h-3 w-3 text-primary fill-primary" />}
                          {item.title}
                        </div>
                        <div className="text-xs text-muted-foreground font-normal line-clamp-1 max-w-[300px] mt-1">
                          {item.content}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.pinned ? (
                          <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase font-bold tracking-wider">Pinned</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider opacity-50">Standard</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">
                        {item.createdAt?.toDate() ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'Syncing...'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg" 
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {announcements?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-muted-foreground italic">
                        <MessageCircle className="mx-auto h-8 w-8 opacity-20 mb-2" />
                        No broadcasts published yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
