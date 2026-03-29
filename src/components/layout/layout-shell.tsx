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
  const isAdmin = pathname.startsWith('/admin');
  const isDashboard = pathname === '/dashboard';

  // We show the global sidebar ONLY on the user-facing Dashboard.
  // We hide it on Admin routes because AdminLayout has its own specialized sidebar.
  const showSidebarPersistent = isDashboard;

  return (
    <div className="flex">
      {!isAdmin && <SidebarNav />}
      <main className={cn(
        "flex-1 min-h-[calc(100vh-80px)] transition-all duration-300 w-full",
        showSidebarPersistent && "md:pl-64 lg:pl-64"
      )}>
        <div className={cn(
          "max-w-[1600px] mx-auto",
          !isHome && "pt-24" // Only add top padding for non-home pages
        )}>
          {children}
        </div>
      </main>
    </div>
  );
}
