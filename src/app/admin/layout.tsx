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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Horizontal Management Bar */}
      <div className="bg-white border-b sticky top-20 z-40 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-2">
          <div className="flex items-center gap-2 mr-6 shrink-0 border-r pr-6">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-black text-sm tracking-tight">Admin Control</span>
          </div>
          
          <nav className="flex items-center gap-1">
            {ADMIN_NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                    isActive 
                      ? "bg-primary/10 text-primary shadow-sm" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-4 pl-6 border-l">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-slate-600 hover:text-destructive hover:bg-destructive/5 rounded-lg font-bold h-9"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Spacious Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 md:py-12 animate-in fade-in duration-500">
        {/* Breadcrumb style navigation */}
        {!pathname.includes('/admin/dashboard') && (
           <div className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
             <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Admin</Link>
             <ChevronRight className="h-3 w-3" />
             <span className="text-foreground">Management Console</span>
           </div>
        )}
        {children}
      </main>
    </div>
  );
}
