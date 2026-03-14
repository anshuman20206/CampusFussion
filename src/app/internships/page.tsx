'use client';

import { useState } from 'react';
import { useFirestore, useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Loader2, Clock, DollarSign, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function InternshipsPage() {
  const firestore = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const internshipsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'internships'), orderBy('postedAt', 'desc'));
  }, [firestore]);

  const { data: internships, isLoading } = useCollection(internshipsQuery);

  const filteredInternships = internships?.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Discover Internships</h1>
        <p className="mt-2 text-muted-foreground">Find your next career opportunity with top companies.</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by title or company..." 
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships?.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      )}
    </div>
  );
}

function InternshipCard({ internship }: { internship: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { firestore, firebaseApp } = useFirebase();

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!firestore || !firebaseApp) return;

    setIsSubmitting(true);
    const formData = new FormData(form);
    const resumeFile = formData.get('resume') as File;

    try {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `resumes/${formData.get('email')}_resume.pdf`);
      const uploadResult = await uploadBytes(storageRef, resumeFile);
      const resumeURL = await getDownloadURL(uploadResult.ref);
      
      await addDoc(collection(firestore, 'applications'), {
        internshipId: internship.id,
        studentName: formData.get('studentName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        resumeURL,
        appliedAt: serverTimestamp(),
      });

      toast({ title: "Success!", description: "Your application has been submitted." });
      form.reset();
      setIsModalOpen(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Failed", description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="flex flex-col h-full border-primary/10">
      <CardHeader>
        <Badge className="w-fit mb-2">{internship.domain || 'Internship'}</Badge>
        <CardTitle className="text-xl">{internship.title}</CardTitle>
        <CardDescription className="font-semibold text-primary">{internship.company}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{internship.location}</div>
          <div className="flex items-center gap-2"><DollarSign className="h-4 w-4" />{internship.stipend}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" />Deadline: {internship.deadline}</div>
        </div>
        <p className="text-sm line-clamp-3">{internship.description}</p>
      </CardContent>
      <CardFooter>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild><Button className="w-full">Apply Now</Button></DialogTrigger>
          <DialogContent>
            <form onSubmit={handleApply} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Application for {internship.title}</DialogTitle>
                <DialogDescription>Submit your details to {internship.company}.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Full Name</Label><Input name="studentName" required /></div>
                <div className="space-y-2"><Label>Email</Label><Input name="email" type="email" required /></div>
                <div className="space-y-2"><Label>Phone</Label><Input name="phone" required /></div>
                <div className="space-y-2"><Label>Resume (PDF)</Label><Input name="resume" type="file" accept=".pdf" required /></div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Send Application"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
