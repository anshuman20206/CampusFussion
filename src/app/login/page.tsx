
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {

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
                asChild
                className="w-full"
            >
                <Link href="/api/auth/github">
                    <Github className="mr-2" />
                    Sign in with GitHub
                </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-4">
                By signing in, you agree to our Terms of Service.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
