
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  joinedEvents: string[];
  participatedHackathons: string[];
  role: 'user' | 'admin';
}

export function AdminDashboard() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setError("Firestore is not initialized.");
      setLoading(false);
      return;
    }
    
    const usersQuery = query(collection(db, "users"));

    const unsub = onSnapshot(usersQuery, (snapshot) => {
      const usersData: UserProfile[] = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as UserProfile);
      });
      setUsers(usersData);
      setLoading(false);
      setError(null);
    }, (err) => {
        console.error("Admin dashboard fetch error:", err);
        setError("You don't have permission to view this data. Make sure you are an admin and your Firestore security rules are set up correctly.");
        setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/2" />
          <div className="mt-8 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 flex-1 flex flex-col">
        <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Viewing all user profiles.</p>
            </div>
        </div>

        {error && (
            <Alert variant="destructive" className="mt-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Access Denied</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {!error && (
            <ScrollArea className="mt-8 flex-1">
                <div className="space-y-6 pr-4">
                    {users.map(user => (
                        <Card key={user.id}>
                            <CardHeader>
                                <div className='flex justify-between items-start'>
                                    <div className="flex items-center gap-4">
                                      <Avatar>
                                        <AvatarImage src={user.photoURL} alt={user.displayName} />
                                        <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <CardTitle className="text-lg">{user.displayName}</CardTitle>
                                        <CardDescription>{user.email}</CardDescription>
                                      </div>
                                    </div>
                                    {user.role === 'admin' && <Badge>Admin</Badge>}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold">Joined Events</h4>
                                    {user.joinedEvents.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {user.joinedEvents.map((event, i) => <Badge key={i} variant="outline">{event}</Badge>)}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No events joined.</p>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold">Participated Hackathons</h4>
                                    {user.participatedHackathons.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {user.participatedHackathons.map((h, i) => <Badge key={i} variant="outline">{h}</Badge>)}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No hackathons participated in.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        )}
    </div>
  );
}
