
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, PlusCircle, Loader2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function ManageInternshipsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const q = useMemoFirebase(() => firestore ? query(collection(firestore, 'internships'), orderBy('postedAt', 'desc')) : null, [firestore]);
  const { data: internships, isLoading } = useCollection(q);

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("CRITICAL: Are you sure you want to permanently delete this internship? This action cannot be undone.")) return;
    try {
      await deleteDoc(doc(firestore, 'internships', id));
      toast({ title: "Deleted", description: "Internship removed from platform." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const filteredInternships = internships?.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manage Internships</h1>
          <p className="text-muted-foreground">Add, edit, or remove career opportunities.</p>
        </div>
        <Button asChild className="rounded-xl font-bold h-12 shadow-lg hover:shadow-primary/25">
          <Link href="/admin/add-internship">
            <PlusCircle className="mr-2 h-5 w-5" />
            Post New Internship
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Active Opportunities</CardTitle>
              <CardDescription>Total of {internships?.length || 0} items found.</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search company or title..." 
                className="pl-9 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
          ) : (
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInternships?.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-bold text-foreground">{item.title}</TableCell>
                      <TableCell className="text-primary font-medium">{item.company}</TableCell>
                      <TableCell><Badge variant="secondary" className="bg-primary/5 text-primary border-none">{item.domain}</Badge></TableCell>
                      <TableCell className="text-xs font-mono">{item.deadline}</TableCell>
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
                  {filteredInternships?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic">
                        No matches found.
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
