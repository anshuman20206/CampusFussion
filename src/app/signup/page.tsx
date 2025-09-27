'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, UserPlus } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { createUserInFirestore } from '@/app/auth/actions';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGitHubSignup = async () => {
    setIsLoading(true);
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create a session cookie by calling a server action
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: await user.getIdToken() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session.');
      }
      
      // Ensure user record exists in Firestore.
      await createUserInFirestore(user.uid, user.email, user.displayName, user.photoURL);

      toast({
        title: 'Success!',
        description: 'Your account has been created.',
      });

      router.push('/dashboard');

    } catch (error: any) {
      console.error("Signup failed:", error);
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-6 py-12 flex justify-center items-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-4">
            <UserPlus className="h-8 w-8 text-primary" />
            <div>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Join CampusConnect by signing up with your GitHub account.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Button
                onClick={handleGitHubSignup}
                disabled={isLoading}
                className="w-full"
            >
                 <Github className="mr-2" />
                 {isLoading ? 'Signing up...' : 'Sign up with GitHub'}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
                By signing up, you agree to our Terms of Service.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
