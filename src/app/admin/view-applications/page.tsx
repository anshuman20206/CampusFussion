'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2 } from 'lucide-react';

export default function ViewApplicationsPage() {
  const firestore = useFirestore();
  
  const q = useMemoFirebase(() => firestore ? query(collection(firestore, 'applications'), orderBy('appliedAt', 'desc')) : null, [firestore]);
  const { data: apps, isLoading } = useCollection(q);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead className="text-right">Resume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps?.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="font-medium">{app.studentName}</div>
                    <div className="text-xs text-muted-foreground">{app.email}</div>
                  </TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>{app.appliedAt?.toDate() ? new Date(app.appliedAt.toDate()).toLocaleDateString() : 'Just now'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <a href={app.resumeURL} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {apps?.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No applications yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
