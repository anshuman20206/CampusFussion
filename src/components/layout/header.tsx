'use client';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, Lock } from 'lucide-react';
import { useUser, useAuth } from '@/firebase';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const auth = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = async () => {
    if (user) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Auto-logout error:", error);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <header
        className={cn(
          "mx-auto w-full max-w-7xl transition-all duration-500 ease-in-out border border-white/10 overflow-hidden",
          isScrolled 
            ? "h-16 rounded-2xl bg-background/80 backdrop-blur-2xl shadow-xl shadow-primary/5 py-0" 
            : "h-20 rounded-3xl bg-background/40 backdrop-blur-md py-2 shadow-sm"
        )}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-6">
          <Logo 
            className={cn("transition-transform duration-500", isScrolled ? "scale-90" : "scale-100")} 
            onClick={handleNavClick}
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={cn(
                  "text-sm font-bold transition-all duration-300 relative group",
                  pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-left",
                  pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="md:hidden rounded-xl">
              <Link href="/admin">
                <Lock className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              variant={isScrolled ? "default" : "outline"} 
              asChild 
              className={cn(
                "hidden md:flex rounded-xl transition-all duration-500",
                !isScrolled && "border-primary/20 bg-background/50 hover:bg-primary/5"
              )}
            >
              <Link href={user ? "/admin/dashboard" : "/admin"}>
                {user ? "Dashboard" : "Admin Login"}
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
