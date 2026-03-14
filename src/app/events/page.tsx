
'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar as CalendarIcon, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function EventsPage() {
  const { firestore } = useFirestore();
  const eventsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'events'), orderBy('date', 'asc'));
  }, [firestore]);

  const { data: events, isLoading } = useCollection(eventsQuery);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Campus Events</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join our workshops, speaker sessions, and hackathons to learn, build, and connect.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {events?.length === 0 && (
            <div className="col-span-full text-center py-20">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-semibold">No upcoming events</h3>
              <p className="text-muted-foreground">Check back soon for new updates!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { firestore } = useFirestore();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      await addDoc(collection(firestore, 'eventRegistrations'), {
        eventId: event.id,
        eventName: event.name,
        name: formData.get('name'),
        email: formData.get('email'),
        college: formData.get('college'),
        phone: formData.get('phone'),
        registeredAt: serverTimestamp(),
      });

      toast({
        title: "Registered!",
        description: "You have successfully registered for the event.",
      });
      setIsModalOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to register.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden border-primary/10 hover:shadow-xl transition-all group">
      <div className="aspect-video relative bg-muted overflow-hidden">
        {event.bannerUrl ? (
          <img src={event.bannerUrl} alt={event.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-primary/5">
            <CalendarIcon className="h-12 w-12 text-primary/20" />
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <CalendarIcon className="h-4 w-4" />
          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          Organized by {event.organizer}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Register Now</Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleRegister}>
              <DialogHeader>
                <DialogTitle>Register for {event.name}</DialogTitle>
                <DialogDescription>Hosted by {event.organizer}.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College</Label>
                  <Input id="college" name="college" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirm Registration"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
