'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle } from 'lucide-react';

export default function AddInternshipPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [domain, setDomain] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) return;

    const form = e.currentTarget;
    setIsSubmitting(true);
    const formData = new FormData(form);

    try {
      await addDoc(collection(firestore, 'internships'), {
        title: formData.get('title'),
        company: formData.get('company'),
        location: formData.get('location'),
        stipend: formData.get('stipend'),
        description: formData.get('description'),
        applyLink: formData.get('applyLink') || "",
        deadline: formData.get('deadline'),
        domain: domain,
        postedAt: serverTimestamp(),
      });

      toast({ title: "Success", description: "Internship posted successfully." });
      form.reset();
      setDomain('');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Post Failed", description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlusCircle className="h-6 w-6 text-primary" />
            <CardTitle>Add New Internship</CardTitle>
          </div>
          <CardDescription>Fill out the details to post a new opportunity.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Internship Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Select onValueChange={setDomain} value={domain} required>
                  <SelectTrigger><SelectValue placeholder="Select Domain" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Dev">Web Dev</SelectItem>
                    <SelectItem value="AI">AI/ML</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="e.g. Remote, Delhi" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stipend">Stipend</Label>
                <Input id="stipend" name="stipend" placeholder="e.g. 10k/month" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" name="deadline" type="date" required />
              </div>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="applyLink">Apply Link (Optional)</Label>
                <Input id="applyLink" name="applyLink" placeholder="https://..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea id="description" name="description" className="min-h-[150px]" required />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Publish Internship"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
