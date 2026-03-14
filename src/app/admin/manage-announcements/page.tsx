'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Loader2, Pin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ManageAnnouncementsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const q = useMemoFirebase(() => firestore ? query(collection(firestore, 'announcements'), orderBy('createdAt', 'desc')) : null, [firestore]);
  const { data: announcements, isLoading } = useCollection(q);

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("Are you sure you want to delete this news item?")) return;
    try {
      await deleteDoc(doc(firestore, 'announcements', id));
      toast({ title: "Deleted", description: "Announcement removed." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Announcements</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {item.pinned && <Pin className="h-3 w-3 text-primary" />}
                    {item.title}
                  </TableCell>
                  <TableCell>
                    {item.createdAt?.toDate() ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                  </TableCell>
                  <TableCell>
                    {item.pinned ? <Badge variant="secondary">Pinned</Badge> : <Badge variant="outline">Standard</Badge>}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {announcements?.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No announcements found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
