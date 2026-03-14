
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin, Clock, DollarSign, Search, Filter, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function InternshipsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  
  const internshipsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'internships'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: internships, isLoading } = useCollection(internshipsQuery);

  const filteredInternships = internships?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === 'all' || item.domain === domainFilter;
    const matchesLocation = locationFilter === 'all' || item.location === locationFilter;
    return matchesSearch && matchesDomain && matchesLocation;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary">Discover Internships</h1>
          <p className="mt-2 text-muted-foreground">Find your next career opportunity with top companies.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title or company..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={domainFilter} onValueChange={setDomainFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            <SelectItem value="Web Dev">Web Dev</SelectItem>
            <SelectItem value="AI">AI/ML</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <MapPin className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Onsite">Onsite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships?.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
          {filteredInternships?.length === 0 && (
            <div className="col-span-full text-center py-20">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <h3 className="mt-4 text-lg font-semibold">No internships found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
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
  const [yearValue, setYearValue] = useState('');
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
      if (!resumeFile || resumeFile.size === 0) {
        throw new Error("Please select a valid PDF resume.");
      }

      // 1. Upload Resume to Storage
      console.log("Starting resume upload...");
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `resumes/${Date.now()}-${resumeFile.name}`);
      const uploadResult = await uploadBytes(storageRef, resumeFile);
      const resumeUrl = await getDownloadURL(uploadResult.ref);
      console.log("Resume uploaded successfully:", resumeUrl);

      // 2. Save Application to Firestore
      console.log("Saving application to Firestore...");
      await addDoc(collection(firestore, 'internshipApplications'), {
        internshipId: internship.id,
        internshipTitle: internship.title,
        companyName: internship.companyName,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        college: formData.get('college'),
        branch: formData.get('branch'),
        year: formData.get('year'),
        phone: formData.get('phone'),
        portfolioUrl: formData.get('portfolioUrl') || "",
        statement: formData.get('statement'),
        resumeUrl,
        appliedAt: serverTimestamp(),
      });

      console.log("Application saved successfully.");
      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      });
      form.reset();
      setYearValue('');
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Application submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit application. Please check your internet and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="flex flex-col h-full border-primary/10 hover:border-primary/30 transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="mb-2">{internship.domain}</Badge>
          <Badge variant="outline">{internship.location}</Badge>
        </div>
        <CardTitle className="text-xl">{internship.title}</CardTitle>
        <CardDescription className="font-semibold text-primary">{internship.companyName}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{internship.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>{internship.stipend}</span>
          </div>
        </div>
        <p className="text-sm line-clamp-3">{internship.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {internship.skillsRequired?.map((skill: string) => (
            <Badge key={skill} variant="ghost" className="bg-primary/5 text-[10px]">{skill}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Apply Now</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleApply}>
              <DialogHeader>
                <DialogTitle>Application for {internship.title}</DialogTitle>
                <DialogDescription>Apply at {internship.companyName}. All fields are required.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" required />
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
                  <Label htmlFor="branch">Branch</Label>
                  <Input id="branch" name="branch" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select onValueChange={setYearValue} value={yearValue} required>
                    <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="year" value={yearValue} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" required />
                </div>
                <div className="space-y-2 col-span-full">
                  <Label htmlFor="resume">Resume (PDF)</Label>
                  <Input id="resume" name="resume" type="file" accept=".pdf" required />
                </div>
                <div className="space-y-2 col-span-full">
                  <Label htmlFor="portfolioUrl">Portfolio / GitHub Link</Label>
                  <Input id="portfolioUrl" name="portfolioUrl" placeholder="https://" />
                </div>
                <div className="space-y-2 col-span-full">
                  <Label htmlFor="statement">Why are you suitable?</Label>
                  <Textarea id="statement" name="statement" placeholder="Short pitch..." required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
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
