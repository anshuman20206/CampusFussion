import { Orbit } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 text-xl font-bold text-foreground hover:text-primary transition-colors", className)}>
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        <Orbit className="h-6 w-6" />
      </div>
      <span className="font-sans font-bold">CampusConnect</span>
    </Link>
  );
}
