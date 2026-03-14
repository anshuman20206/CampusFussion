'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import { signInAnonymously, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    // Hardcoded credentials check
    if (username === 'XE6' && password === 'Sachin9555') {
      try {
        if (!auth) throw new Error("Auth not initialized");
        
        // Ensure the session persists even if the tab is closed
        await setPersistence(auth, browserLocalPersistence);
        await signInAnonymously(auth);
        
        toast({ title: "Welcome back!", description: "Successfully logged in to Admin Dashboard." });
        router.push('/admin/dashboard');
      } catch (error: any) {
        console.error("Auth Error:", error);
        if (error.code === 'auth/configuration-not-found') {
          setAuthError("Anonymous Authentication is not enabled in your Firebase Console. Please enable it under Authentication > Sign-in method.");
        } else {
          toast({ variant: "destructive", title: "Login Failed", description: error.message || "Firebase auth failed." });
        }
      }
    } else {
      toast({ variant: "destructive", title: "Invalid Credentials", description: "Please check your username and password." });
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-6">
      <div className="w-full max-w-md space-y-4">
        {authError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Configuration Error</AlertTitle>
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}
        <Card className="shadow-2xl border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Lock className="text-primary h-8 w-8" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Secure access to the management portal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
