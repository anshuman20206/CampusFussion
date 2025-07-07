import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <Logo />
          <p className="max-w-xs text-center text-sm text-muted-foreground sm:text-left">
            Empowering Developers. Building Tech Communities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container flex h-14 items-center justify-center">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CampusConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
