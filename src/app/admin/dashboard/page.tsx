
'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Bell, 
  Loader2, 
  PlusCircle, 
  Settings2,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const firestore = useFirestore();

  const internshipsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'internships')) : null, [firestore]);
  const applicationsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'applications'), orderBy('appliedAt', 'desc'), limit(5)) : null, [firestore]);
  const eventsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'events')) : null, [firestore]);
  const announcementsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'announcements')) : null, [firestore]);

  const { data: internships } = useCollection(internshipsQuery);
  const { data: applications, isLoading: loadingApps } = useCollection(applicationsQuery);
  const { data: events } = useCollection(eventsQuery);
  const { data: announcements } = useCollection(announcementsQuery);

  const stats = [
    { title: "Internships", value: internships?.length || 0, icon: Briefcase, color: "text-blue-600" },
    { title: "Total Apps", value: applications?.length || 0, icon: FileText, color: "text-green-600" },
    { title: "Active Events", value: events?.length || 0, icon: Calendar, color: "text-purple-600" },
    { title: "News Items", value: announcements?.length || 0, icon: Bell, color: "text-orange-600" },
  ];

  const quickActions = [
    { label: "Add Internship", href: "/admin/add-internship", icon: PlusCircle, color: "bg-blue-500" },
    { label: "Add Event", href: "/admin/add-event", icon: PlusCircle, color: "bg-purple-500" },
    { label: "Add News", href: "/admin/add-announcement", icon: PlusCircle, color: "bg-orange-500" },
    { label: "Manage Content", href: "/admin/manage-internships", icon: Settings2, color: "bg-slate-700" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Admin Control Center</h1>
        <p className="text-muted-foreground">Comprehensive oversight and management of Campus Fusion resources.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                Live Synchronization
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Button 
                  key={action.label} 
                  variant="outline" 
                  asChild 
                  className="h-20 justify-start px-6 rounded-2xl border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                >
                  <Link href={action.href}>
                    <div className={`${action.color} p-2 rounded-xl text-white mr-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </section>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Recent Applications
              </CardTitle>
              <CardDescription>The last 5 student submissions for internships.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loadingApps ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                  </div>
                ) : applications && applications.length > 0 ? (
                  applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                      <div>
                        <div className="font-bold text-sm">{app.studentName}</div>
                        <div className="text-xs text-muted-foreground">{app.internshipTitle || 'General Application'}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {app.appliedAt?.toDate ? new Date(app.appliedAt.toDate()).toLocaleDateString() : 'Just now'}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground italic bg-muted/20 rounded-xl">
                    No applications received yet.
                  </div>
                )}
              </div>
              {applications && applications.length > 0 && (
                <Button variant="link" asChild className="w-full mt-4 text-primary">
                  <Link href="/admin/view-applications">View All Applications</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* System Health / Info */}
        <div className="space-y-8">
          <Card className="border-none shadow-md bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-white">Admin Privileges</CardTitle>
              <CardDescription className="text-slate-400">Authenticated as Administrator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">Encrypted Session</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                You have full write and delete access to internships, events, and community news. Always double-check before deleting permanent records.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, variant, className }: any) {
  const variants: any = {
    outline: "border border-primary/20 text-primary",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full ${variants[variant || 'outline']} ${className}`}>
      {children}
    </span>
  );
}
