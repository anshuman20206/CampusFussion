'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LogOut, LayoutDashboard, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { useAuth } from '@/hooks/use-auth';
import { logoutAction } from '@/app/login/actions';
import { Skeleton } from '../ui/skeleton';

function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-10 w-24" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2" />
            Dashboard
          </Link>
        </Button>
        <form action={logoutAction}>
          <Button variant="outline" size="icon" type="submit">
            <LogOut />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Button asChild>
      <Link href="/login">
        <LogIn className="mr-2" />
        Login
      </Link>
    </Button>
  );
}


export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 max-w-screen-2xl items-center px-6">
        <Logo />
        <nav className="ml-auto hidden items-center gap-x-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary font-bold' : 'text-foreground/70'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-6 hidden items-center md:flex">
          <AuthButtons />
        </div>
        <div className="ml-auto flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background">
              <Logo />
              <div className="mt-8 flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-lg transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <AuthButtons />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
