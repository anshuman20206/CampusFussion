import { Orbit } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors", className)}>
      <div className="rounded-full bg-primary/20 p-2 text-primary">
        <Orbit className="h-6 w-6" />
      </div>
      <span className="font-headline">CampusConnect</span>
    </Link>
  );
}
