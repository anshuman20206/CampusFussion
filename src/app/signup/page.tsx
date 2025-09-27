'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, UserPlus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [isPending, setIsPending] = useState(false);

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
                asChild
                className="w-full"
                onClick={() => setIsPending(true)}
                disabled={isPending}
            >
                 <Link href="/api/auth/github">
                    {isPending ? 'Redirecting...' : (
                        <>
                            <Github className="mr-2" />
                            Sign up with GitHub
                        </>
                    )}
                </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
                By signing up, you agree to our Terms of Service.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
