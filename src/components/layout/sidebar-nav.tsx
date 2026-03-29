'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  LayoutDashboard
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { useUser } from '@/firebase';

export function SidebarNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const { user } = useUser();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpenMobile(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="bg-background/80 backdrop-blur-sm shadow-md rounded-xl"
        >
          {isOpenMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay for mobile - Clicking anywhere else closes it */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 z-[35] bg-black/40 backdrop-blur-sm md:hidden transition-all duration-300"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300 ease-in-out shadow-2xl md:shadow-none",
        isCollapsed ? "w-20" : "w-64",
        isOpenMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between px-6">
            {!isCollapsed && (
              <span className="text-xl font-black tracking-tighter text-primary">CAMPUS<span className="text-foreground">FUSION</span></span>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex ml-auto rounded-full hover:bg-muted"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpenMobile(false)}
                  className={cn(
                    "group flex items-center rounded-xl px-3 py-3 text-sm font-bold transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary shadow-sm" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    !isCollapsed && "mr-3"
                  )} />
                  {!isCollapsed && <span>{item.label}</span>}
                  {isActive && !isCollapsed && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}

            {/* Dashboard Link - Only for Admins */}
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpenMobile(false)}
                className={cn(
                  "group flex items-center rounded-xl px-3 py-3 text-sm font-bold transition-all duration-200 mt-4",
                  pathname === "/dashboard"
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <LayoutDashboard className={cn(
                  "h-5 w-5 shrink-0",
                  pathname === "/dashboard" ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                  !isCollapsed && "mr-3"
                )} />
                {!isCollapsed && <span>Admin Dashboard</span>}
              </Link>
            )}
          </nav>

          <div className="p-4 border-t">
            {!isCollapsed && (
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[100%] bg-primary" />
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground font-bold uppercase">
                  {user ? "Admin Mode Active" : "Public Mode Active"}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
