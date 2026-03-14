
'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Loader2, Clock, DollarSign, MapPin, Linkedin, Github, Code2 } from 'lucide-react';
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
        <input 
          placeholder="Search by title or company..." 
          className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 pl-9 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
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
          {filteredInternships?.length === 0 && (
            <div className="col-span-full text-center py-20 bg-muted/20 rounded-xl border border-dashed">
              <p className="text-muted-foreground">No internships found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InternshipCard({ internship }: { internship: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!firestore) return;

    setIsSubmitting(true);
    const formData = new FormData(form);

    try {
      await addDoc(collection(firestore, 'applications'), {
        internshipId: internship.id,
        internshipTitle: internship.title,
        company: internship.company,
        studentName: formData.get('studentName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        linkedinURL: formData.get('linkedinURL'),
        githubURL: formData.get('githubURL'),
        leetcodeURL: formData.get('leetcodeURL'),
        appliedAt: serverTimestamp(),
      });

      toast({ title: "Success!", description: "Your application has been submitted successfully." });
      form.reset();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Application Error:", error);
      toast({ variant: "destructive", title: "Submission Failed", description: error.message || "Failed to submit application." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="flex flex-col h-full border-primary/10 hover:border-primary/30 transition-colors">
      <CardHeader>
        <Badge className="w-fit mb-2">{internship.domain || 'Internship'}</Badge>
        <CardTitle className="text-xl line-clamp-1">{internship.title}</CardTitle>
        <CardDescription className="font-semibold text-primary">{internship.company}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{internship.location}</div>
          <div className="flex items-center gap-2"><DollarSign className="h-4 w-4" />{internship.stipend}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" />Deadline: {internship.deadline}</div>
        </div>
        <p className="text-sm line-clamp-3 text-muted-foreground">{internship.description}</p>
      </CardContent>
      <CardFooter>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild><Button className="w-full">Apply Now</Button></DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleApply} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Application for {internship.title}</DialogTitle>
                <DialogDescription>Apply to join {internship.company}. No resume required, just your profiles!</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Full Name</Label>
                    <Input id="studentName" name="studentName" placeholder="Your Name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" placeholder="9876543210" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="email@example.com" required />
                </div>
                
                <div className="space-y-3 pt-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-primary">Professional Links</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input name="linkedinURL" placeholder="LinkedIn Profile URL" className="pl-9" required />
                  </div>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input name="githubURL" placeholder="GitHub Profile URL" className="pl-9" />
                  </div>
                  <div className="relative">
                    <Code2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input name="leetcodeURL" placeholder="LeetCode Profile URL" className="pl-9" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
