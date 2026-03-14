
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Linkedin, Github, Code2, ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ViewApplicationsPage() {
  const firestore = useFirestore();
  
  const q = useMemoFirebase(() => firestore ? query(collection(firestore, 'applications'), orderBy('appliedAt', 'desc')) : null, [firestore]);
  const { data: apps, isLoading } = useCollection(q);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Applications</h1>
          <p className="text-muted-foreground">Review incoming interest for posted internships.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>Total of {apps?.length || 0} applications received.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Student</TableHead>
                    <TableHead>Target Internship</TableHead>
                    <TableHead>Profile Links</TableHead>
                    <TableHead className="text-right">Applied On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apps?.map((app) => (
                    <TableRow key={app.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="font-semibold text-foreground">{app.studentName}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[150px]">{app.email}</div>
                        <div className="text-xs text-muted-foreground">{app.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-primary">{app.internshipTitle || 'N/A'}</div>
                        <div className="text-xs text-muted-foreground">{app.company || 'N/A'}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            {app.linkedinURL && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                    <a href={app.linkedinURL} target="_blank" rel="noopener noreferrer">
                                      <Linkedin className="h-4 w-4 text-blue-600" />
                                    </a>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>LinkedIn</TooltipContent>
                              </Tooltip>
                            )}
                            {app.githubURL && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                    <a href={app.githubURL} target="_blank" rel="noopener noreferrer">
                                      <Github className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>GitHub</TooltipContent>
                              </Tooltip>
                            )}
                            {app.leetcodeURL && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                                    <a href={app.leetcodeURL} target="_blank" rel="noopener noreferrer">
                                      <Code2 className="h-4 w-4 text-orange-500" />
                                    </a>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>LeetCode</TooltipContent>
                              </Tooltip>
                            )}
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="text-sm font-medium">
                          {app.appliedAt?.toDate ? new Date(app.appliedAt.toDate()).toLocaleDateString() : 'Just now'}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {apps?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <ExternalLink className="h-8 w-8 opacity-20" />
                          <p>No applications received yet.</p>
                        </div>
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
