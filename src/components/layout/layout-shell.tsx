'use client';

import { usePathname } from 'next/navigation';
import { SidebarNav } from './sidebar-nav';
import { cn } from '@/lib/utils';

/**
 * A client-side shell that manages the responsive layout behavior.
 * It handles the dynamic padding of the main content area based on the route.
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="flex">
      <SidebarNav />
      <main className={cn(
        "flex-1 min-h-screen transition-all duration-300 w-full",
        // Only add persistent padding if we are NOT on the homepage
        !isHome && "md:pl-64 lg:pl-64"
      )}>
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
