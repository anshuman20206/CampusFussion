
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ManageInternshipsPage() {
  const { firestore } = useFirestore();
  const { toast } = useToast();
  
  const q = useMemoFirebase(() => firestore ? query(collection(firestore, 'internships'), orderBy('createdAt', 'desc')) : null, [firestore]);
  const { data: internships, isLoading } = useCollection(q);

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteDoc(doc(firestore, 'internships', id));
      toast({ title: "Deleted", description: "Internship removed successfully." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Internships</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell><Badge variant="outline">{item.domain}</Badge></TableCell>
                  <TableCell>{item.deadline}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {internships?.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No internships found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
