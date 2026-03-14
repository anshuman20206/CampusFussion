
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Download, Loader2 } from 'lucide-react';

export default function ViewApplicationsPage() {
  const { firestore } = useFirestore();
  
  const q = useMemoFirebase(() => firestore ? query(collection(firestore, 'internshipApplications'), orderBy('appliedAt', 'desc')) : null, [firestore]);
  const { data: apps, isLoading } = useCollection(q);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Internship Applications</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Internship</TableHead>
                <TableHead>College/Year</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead className="text-right">Resume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps?.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="font-medium">{app.fullName}</div>
                    <div className="text-xs text-muted-foreground">{app.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{app.internshipTitle}</div>
                    <div className="text-xs text-muted-foreground">{app.companyName}</div>
                  </TableCell>
                  <TableCell>
                    <div>{app.college}</div>
                    <div className="text-xs text-muted-foreground">{app.year} - {app.branch}</div>
                  </TableCell>
                  <TableCell>{new Date(app.appliedAt?.toDate()).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {apps?.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No applications yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
