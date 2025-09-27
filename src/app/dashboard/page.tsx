'use client';

import { useEffect, useState } from 'react';
import { getFirebaseServices } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutDashboard, Mail, Calendar, Trophy } from 'lucide-react';
import { AdminDashboard } from '@/components/pages/dashboard/admin-dashboard';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfile {
  email: string;
  displayName: string;
  photoURL: string;
  joinedEvents: string[];
  participatedHackathons: string[];
  role: 'user' | 'admin';
  createdAt: any;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      const { db } = getFirebaseServices();
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (doc.exists()) {
          setProfile(doc.data() as UserProfile);
        } else {
          console.log("No such user profile!");
          setProfile(null);
        }
        setLoading(false);
      });
      return () => unsub();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
          <div className="grid gap-8 md:grid-cols-2 mt-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold">Please log in to view your dashboard.</h1>
      </div>
    );
  }
  
  if (profile.role === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={profile.photoURL} alt={profile.displayName} />
              <AvatarFallback>{profile.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold">Your Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {profile.displayName || profile.email}!</p>
            </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Calendar className="h-6 w-6 text-secondary" />
                        <CardTitle>Joined Events</CardTitle>
                    </div>
                    <CardDescription>Events you've registered for.</CardDescription>
                </CardHeader>
                <CardContent>
                    {profile.joinedEvents.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {profile.joinedEvents.map((event, i) => <Badge key={i} variant="secondary">{event}</Badge>)}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No events joined yet.</p>
                    )}
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-secondary" />
                        <CardTitle>Participated Hackathons</CardTitle>
                    </div>
                    <CardDescription>Hackathons you've been a part of.</CardDescription>
                </CardHeader>
                <CardContent>
                    {profile.participatedHackathons.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {profile.participatedHackathons.map((hackathon, i) => <Badge key={i} variant="secondary">{hackathon}</Badge>)}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No hackathons participated in yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
