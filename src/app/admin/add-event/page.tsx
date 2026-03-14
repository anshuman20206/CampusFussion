'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CalendarPlus } from 'lucide-react';

export default function AddEventPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) return;

    const form = e.currentTarget;
    setIsSubmitting(true);
    const formData = new FormData(form);

    try {
      const bannerUrl = (formData.get('bannerUrl') as string) || `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/1200/600`;
      
      await addDoc(collection(firestore, 'events'), {
        name: formData.get('name'),
        organizer: formData.get('organizer'),
        date: formData.get('date'),
        location: formData.get('location'),
        description: formData.get('description'),
        bannerUrl: bannerUrl,
        createdAt: serverTimestamp(),
      });

      toast({ title: "Success", description: "Event published successfully." });
      form.reset();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-6 w-6 text-primary" />
            <CardTitle>Add New Event</CardTitle>
          </div>
          <CardDescription>Create a campus event for students to register.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer</Label>
                <Input id="organizer" name="organizer" placeholder="e.g. GDG IEC" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Event Date & Time</Label>
                <Input id="date" name="date" type="datetime-local" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="e.g. Seminar Hall" required />
              </div>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="bannerUrl">Banner Image URL (Optional)</Label>
                <Input id="bannerUrl" name="bannerUrl" placeholder="https://..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" className="min-h-[120px]" required />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Publish Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
