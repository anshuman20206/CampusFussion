'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Toaster } from '../ui/toaster';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <SidebarProvider>
        <div className="relative flex min-h-screen">
          <Sidebar>
            <SidebarHeader>
              <Logo />
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {NAV_LINKS.map((link) => {
                   const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href) && link.href !== '/';
                   return (
                      <SidebarMenuItem key={link.href}>
                          <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={link.href}>
                              <link.icon className="h-4 w-4" />
                              <span>{link.label}</span>
                          </Link>
                          </SidebarMenuButton>
                      </SidebarMenuItem>
                   )
                  })}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          
          <div className="flex min-h-svh w-full flex-1 flex-col">
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>
                <div className="hidden flex-1 md:block">
                  {/* Title or breadcrumb can go here */}
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person avatar" alt="User Avatar" />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>
                              <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">Alex Johnson</p>
                                <p className="text-xs leading-none text-muted-foreground">alex@example.com</p>
                              </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild><Link href="/dashboard" className="w-full">Dashboard</Link></DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild><Link href="/login">Logout</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <SidebarInset>
                {children}
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
