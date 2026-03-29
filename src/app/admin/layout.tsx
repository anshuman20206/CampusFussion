'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { ADMIN_NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogOut, ShieldCheck, Loader2, ChevronRight } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const isLoginPage = pathname === '/admin';

  useEffect(() => {
    if (!isUserLoading && !user && !isLoginPage) {
      router.push('/admin');
    }
  }, [user, isUserLoading, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sleek Admin Sidebar */}
      <aside className="w-72 bg-white border-r hidden lg:flex flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-8 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight block">Admin Center</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Secure Access</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Management</p>
          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                )}
              >
                <Icon className={cn("h-4.5 w-4.5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                {link.label}
                {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t bg-slate-50/50">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-600 hover:text-destructive hover:bg-destructive/5 rounded-xl font-bold"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Modern Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8 md:p-12 animate-in fade-in duration-500">
          {/* Internal Page Header (Breadcrumb style) */}
          {!pathname.includes('/admin/dashboard') && (
             <div className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
               <Link href="/admin/dashboard" className="hover:text-primary">Admin</Link>
               <ChevronRight className="h-3 w-3" />
               <span className="text-foreground">Current View</span>
             </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
