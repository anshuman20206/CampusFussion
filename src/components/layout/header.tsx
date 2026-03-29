'use client';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, Lock } from 'lucide-react';
import { useUser } from '@/firebase';

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/dashboard"
              className={cn(
                "text-sm font-bold transition-colors hover:text-primary",
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link href="/admin">
              <Lock className="h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="hidden md:flex rounded-xl border-primary/20 hover:bg-primary/5">
            <Link href="/admin">
              {user ? "Admin Panel" : "Admin Login"}
            </Link>
          </Button>

          {/* This button is handled by SidebarNav internally, but we can trigger it here if we want to synchronize */}
          {/* For now, we rely on the SidebarNav's internal toggle button which appears on mobile/homepage */}
        </div>
      </div>
    </header>
  );
}
