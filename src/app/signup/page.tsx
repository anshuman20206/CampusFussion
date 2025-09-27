'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Github, UserPlus } from 'lucide-react';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserInFirestore } from '../auth/actions';

export default function SignupPage() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGitHubSignup = async () => {
    setIsPending(true);
    if (!auth) {
        toast({
            variant: 'destructive',
            title: 'Signup Failed',
            description: 'Firebase is not configured correctly.',
        });
        setIsPending(false);
        return;
    }
    const provider = new GithubAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Create user record in Firestore.
        // This action is idempotent; it won't overwrite existing user data on subsequent logins.
        const firestoreResult = await createUserInFirestore(user.uid, user.email, user.displayName, user.photoURL);

        if (firestoreResult.error) {
           throw new Error(firestoreResult.error);
        }

        toast({
            title: 'Account Created!',
            description: `Welcome, ${user.displayName || user.email}!`,
        });
        router.push('/dashboard');

    } catch (error: any) {
        let message = "An unexpected error occurred.";
        if (error.code === 'auth/account-exists-with-different-credential') {
            message = "An account already exists with the same email address. Please log in with that method.";
        }
        toast({
            variant: 'destructive',
            title: 'Signup Failed',
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
            <UserPlus className="h-8 w-8 text-primary" />
            <div>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Join CampusConnect by signing up with your GitHub account.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Button
                type="button"
                className="w-full"
                onClick={handleGitHubSignup}
                disabled={isPending}
            >
                {isPending ? 'Redirecting...' : (
                    <>
                        <Github className="mr-2" />
                        Sign up with GitHub
                    </>
                )}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
                By signing up, you agree to our Terms of Service.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
