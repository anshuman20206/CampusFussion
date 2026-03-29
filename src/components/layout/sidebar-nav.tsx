'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/constants';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

export function SidebarNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const auth = useAuth();

  const isHome = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');
  const isDashboard = pathname === '/dashboard';
  const showSidebarPersistent = isAdmin || isDashboard;

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      {/* Mobile Toggle Button (Visible only when sidebar is not persistent) */}
      {!showSidebarPersistent && (
        <div className="fixed top-5 left-6 z-[60] md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-background/80 backdrop-blur-md shadow-lg rounded-xl border-primary/20 h-10 w-10"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen border-r bg-card transition-all duration-300 ease-in-out shadow-2xl",
        isCollapsed ? "w-20" : "w-64",
        // Logic for translation:
        // 1. If isOpen (mobile/homepage toggle): show
        // 2. If showSidebarPersistent (admin/dashboard): show on desktop
        isOpen ? "translate-x-0" : "-translate-x-full",
        showSidebarPersistent && "md:translate-x-0"
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
              className={cn(
                "hidden md:flex ml-auto rounded-full hover:bg-muted",
                !showSidebarPersistent && "hidden"
              )}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="md:hidden ml-auto rounded-full"
            >
              <X className="h-5 w-5" />
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
            {user && !isCollapsed && (
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            )}
            {!isCollapsed && !user && (
              <div className="rounded-2xl bg-muted/50 p-4">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">
                  Campus Fusion Community
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
