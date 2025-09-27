'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, LogIn } from 'lucide-react';
import { getFirebaseServices } from '@/lib/firebase';
import { GithubAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function LoginPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    const { auth } = getFirebaseServices();
    const provider = new GithubAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center items-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-4">
            <LogIn className="h-8 w-8 text-primary" />
            <div>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Log in or sign up to access your dashboard.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Button
                onClick={handleGitHubLogin}
                disabled={isLoading}
                className="w-full"
            >
                <Github className="mr-2" />
                {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
                By signing in, you agree to our Terms of Service.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
