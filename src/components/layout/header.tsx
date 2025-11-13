'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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
           <Link
              href="/gallery"
              className={cn(
                'transition-colors hover:text-primary',
                pathname === "/gallery" ? 'text-primary font-bold' : 'text-foreground/70'
              )}
            >
              Gallery
            </Link>
            <Link
              href="/chatbot"
              className={cn(
                'transition-colors hover:text-primary',
                pathname === "/chatbot" ? 'text-primary font-bold' : 'text-foreground/70'
              )}
            >
              AI Assistant
            </Link>
        </nav>
        <div className="ml-auto flex items-center md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Logo />
              <div className="mt-8 flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={cn(
                      'text-lg transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-primary/20 pt-4">
                  <Link
                    href="/gallery"
                    onClick={handleLinkClick}
                    className={cn(
                      'text-lg transition-colors hover:text-primary',
                       pathname === '/gallery' ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    Gallery
                  </Link>
                </div>
                <div>
                  <Link
                    href="/chatbot"
                    onClick={handleLinkClick}
                    className={cn(
                      'text-lg transition-colors hover:text-primary',
                      pathname === '/chatbot' ? 'text-primary font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    AI Assistant
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
