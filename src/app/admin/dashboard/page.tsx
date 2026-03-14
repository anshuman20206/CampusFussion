'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, FileText, TrendingUp, Bell, Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const firestore = useFirestore();

  const internshipsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'internships')) : null, [firestore]);
  const applicationsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'internshipApplications'), orderBy('appliedAt', 'desc'), limit(5)) : null, [firestore]);
  const eventsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'events')) : null, [firestore]);
  const registrationsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'eventRegistrations'), orderBy('registeredAt', 'desc'), limit(5)) : null, [firestore]);
  const announcementsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'announcements')) : null, [firestore]);

  const { data: internships } = useCollection(internshipsQuery);
  const { data: applications, isLoading: loadingApps } = useCollection(applicationsQuery);
  const { data: events } = useCollection(eventsQuery);
  const { data: registrations, isLoading: loadingRegs } = useCollection(registrationsQuery);
  const { data: announcements } = useCollection(announcementsQuery);

  const stats = [
    { title: "Internships", value: internships?.length || 0, icon: Briefcase, color: "text-blue-600" },
    { title: "Total Apps", value: applications?.length || 0, icon: FileText, color: "text-green-600" },
    { title: "Active Events", value: events?.length || 0, icon: Calendar, color: "text-purple-600" },
    { title: "News Items", value: announcements?.length || 0, icon: Bell, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor platform activity and growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                Live on platform
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loadingApps ? (
                <Loader2 className="animate-spin mx-auto h-6 w-6 text-muted-foreground" />
              ) : applications && applications.length > 0 ? (
                applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">{app.fullName}</div>
                      <div className="text-xs text-muted-foreground">{app.internshipTitle}</div>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {app.appliedAt?.toDate ? new Date(app.appliedAt.toDate()).toLocaleDateString() : 'Just now'}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic text-center py-4">No applications yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Event Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loadingRegs ? (
                <Loader2 className="animate-spin mx-auto h-6 w-6 text-muted-foreground" />
              ) : registrations && registrations.length > 0 ? (
                registrations.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">{reg.name}</div>
                      <div className="text-xs text-muted-foreground">{reg.eventName}</div>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {reg.registeredAt?.toDate ? new Date(reg.registeredAt.toDate()).toLocaleDateString() : 'Recently'}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic text-center py-4">No registrations yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
