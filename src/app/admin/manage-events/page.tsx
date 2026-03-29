
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, PlusCircle, Loader2, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ManageEventsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const q = useMemoFirebase(() => firestore ? query(collection(firestore, 'events'), orderBy('date', 'desc')) : null, [firestore]);
  const { data: events, isLoading } = useCollection(q);

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("CRITICAL: Permanently delete this event? This will also affect any associated registrations.")) return;
    try {
      await deleteDoc(doc(firestore, 'events', id));
      toast({ title: "Event Deleted", description: "Successfully removed from the platform." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manage Events</h1>
          <p className="text-muted-foreground">Organize and monitor campus workshops and sessions.</p>
        </div>
        <Button asChild className="rounded-xl font-bold h-12 shadow-lg hover:shadow-primary/25">
          <Link href="/admin/add-event">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Event
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-xl">
        <CardHeader>
          <CardTitle>System Events</CardTitle>
          <CardDescription>Scheduled activities across the campus node.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
          ) : (
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Event Details</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events?.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell>
                        <div className="font-bold text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-[250px]">{item.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-primary" />
                          {item.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          {new Date(item.date).toLocaleString()}
                        </div>
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
                  {events?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-muted-foreground italic">
                        No events found on the calendar.
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
