'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BellPlus } from 'lucide-react';

export default function AddAnnouncementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) return;

    const form = e.currentTarget;
    setIsSubmitting(true);
    const formData = new FormData(form);

    try {
      await addDoc(collection(firestore, 'announcements'), {
        title: formData.get('title'),
        content: formData.get('content'),
        pinned: isPinned,
        createdAt: serverTimestamp(),
      });

      toast({ title: "Success", description: "Announcement published successfully." });
      form.reset();
      setIsPinned(false);
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
            <BellPlus className="h-6 w-6 text-primary" />
            <CardTitle>Add New Announcement</CardTitle>
          </div>
          <CardDescription>Publish news or important updates for the community.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="e.g. Hackathon Registration Open" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" className="min-h-[150px]" placeholder="Write the announcement details here..." required />
            </div>

            <div className="flex items-center space-x-2 border p-4 rounded-lg bg-muted/30">
              <Switch id="pinned" checked={isPinned} onCheckedChange={setIsPinned} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="pinned" className="text-sm font-medium leading-none">Pin this announcement</Label>
                <p className="text-sm text-muted-foreground">Pinned announcements appear at the top of the news feed.</p>
              </div>
            </div>

            <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Publish News"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
