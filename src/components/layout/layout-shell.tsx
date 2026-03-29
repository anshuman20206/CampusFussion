'use client';

import { usePathname } from 'next/navigation';
import { SidebarNav } from './sidebar-nav';
import { cn } from '@/lib/utils';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');
  const isDashboard = pathname === '/dashboard';
  const isChatbot = pathname === '/chatbot';

  const showSidebarPersistent = isDashboard;

  return (
    <div className="flex bg-page-gradient min-h-screen transition-colors duration-700">
      {!isAdmin && !isChatbot && <SidebarNav />}
      <main className={cn(
        "flex-1 min-h-[calc(100vh-80px)] transition-all duration-300 w-full",
        showSidebarPersistent && "md:pl-64"
      )}>
        <div className={cn(
          "max-w-[1600px] mx-auto",
          !isHome && !isChatbot && "pt-24 px-6 md:px-10 pb-20"
        )}>
          {children}
        </div>
      </main>
    </div>
  );
}