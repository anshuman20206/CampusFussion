'use client';

import { Hero } from '@/components/pages/home/hero';
import { useFirestore, useCollection, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, limit } from 'firebase/firestore';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  FileText, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  Pin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const firestore = useFirestore();
  const { user } = useUser();

  const internshipsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'internships'), limit(5)) : null, [firestore]);
  const eventsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'events'), limit(3)) : null, [firestore]);
  const announcementsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'announcements'), limit(3)) : null, [firestore]);
  
  // Only query applications if a user is logged in, as it requires admin permissions
  const applicationsQuery = useMemoFirebase(() => (firestore && user) ? query(collection(firestore, 'applications')) : null, [firestore, user]);

  const { data: internships, isLoading: loadingInterns } = useCollection(internshipsQuery);
  const { data: events, isLoading: loadingEvents } = useCollection(eventsQuery);
  const { data: announcements, isLoading: loadingNews } = useCollection(announcementsQuery);
  const { data: apps } = useCollection(applicationsQuery);

  const stats = [
    { label: "Total Students", value: "2.4k+", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Upcoming Events", value: events?.length || "8", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Active Internships", value: internships?.length || "12", icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Applications", value: apps ? apps.length : (user ? "0" : "45"), icon: FileText, color: "text-pink-500", bg: "bg-pink-50" },
  ];

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Hero />
      
      <div className="p-8 space-y-10 -mt-10 relative z-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
                  </div>
                  <div className={stat.bg + " p-3 rounded-2xl"}>
                    <stat.icon className={stat.color + " h-6 w-6"} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-green-600 font-bold">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this week
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed - Internships & News */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black tracking-tight">Featured Internships</h2>
                <Button variant="ghost" asChild className="font-bold text-primary hover:bg-primary/5">
                  <Link href="/internships" className="flex items-center gap-1">
                    View all <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {loadingInterns ? (
                  Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                  internships?.map((job) => (
                    <Card key={job.id} className="glass group">
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-lg">
                            {job.company?.[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{job.title}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              {job.company} • <Clock className="h-3 w-3" /> {job.deadline}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none px-3 py-1">
                          {job.domain}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black tracking-tight">Community News</h2>
                <Button variant="ghost" asChild className="font-bold text-primary hover:bg-primary/5">
                  <Link href="/announcements" className="flex items-center gap-1">
                    See updates <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {announcements?.map((news) => (
                  <Card key={news.id} className="border-none glass">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{news.title}</CardTitle>
                        {news.pinned && <Pin className="h-4 w-4 text-primary fill-primary" />}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {news.content}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                       <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                         Posted {new Date(news.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}
                       </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Feed - Events */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-black tracking-tight mb-6">Latest Events</h2>
              <div className="space-y-4">
                {events?.map((event) => (
                  <Card key={event.id} className="overflow-hidden border-none glass hover:scale-[1.03] transition-transform">
                    <div className="aspect-[2/1] bg-muted relative overflow-hidden">
                       <img src={event.bannerUrl || `https://picsum.photos/seed/${event.id}/400/200`} className="object-cover w-full h-full" alt={event.title} />
                       <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                         {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                       </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base line-clamp-1">{event.title}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="h-20 w-full rounded-2xl bg-muted animate-pulse flex items-center px-5 gap-4">
      <div className="h-12 w-12 rounded-2xl bg-background/50" />
      <div className="space-y-2 flex-1">
        <div className="h-4 w-[40%] bg-background/50 rounded-lg" />
        <div className="h-3 w-[20%] bg-background/50 rounded-lg" />
      </div>
    </div>
  );
}