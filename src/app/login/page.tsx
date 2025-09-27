'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Github, LogIn } from 'lucide-react';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserInFirestore } from '@/app/auth/actions';

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGitHubLogin = async () => {
    setIsPending(true);
    if (!auth) {
        toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: 'Firebase is not configured correctly.',
        });
        setIsPending(false);
        return;
    }
    const provider = new GithubAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Create or update user in Firestore by calling the server action directly
        const firestoreResult = await createUserInFirestore(user.uid, user.email, user.displayName, user.photoURL);

        if (firestoreResult?.error) {
           throw new Error(firestoreResult.error);
        }

        toast({
            title: 'Login Successful',
            description: `Welcome back, ${user.displayName || user.email}!`,
        });
        router.push('/dashboard');

    } catch (error: any) {
        let message = "An unexpected error occurred.";
        if (error.code === 'auth/account-exists-with-different-credential') {
            message = "An account already exists with the same email address but different sign-in credentials.";
        } else if (error.message) {
            message = error.message;
        } else if (error.code === 'auth/unauthorized-domain') {
            message = "This domain is not authorized for login. Please contact support.";
        }
        
        toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: message,
        });
    } finally {
        setIsPending(false);
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
                type="button"
                className="w-full"
                onClick={handleGitHubLogin}
                disabled={isPending}
            >
                {isPending ? 'Redirecting...' : (
                    <>
                        <Github className="mr-2" />
                        Sign in with GitHub
                    </>
                )}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
                By signing in, you agree to our Terms of Service.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
