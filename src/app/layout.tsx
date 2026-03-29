import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';

const font = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Campus Fusion | Opportunity Hub',
  description: 'The central hub for campus opportunities, internships, and events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        'min-h-screen font-sans antialiased bg-background overflow-x-hidden', 
        font.variable
      )}>
        <FirebaseClientProvider>
          <div className="flex">
            <SidebarNav />
            <main className="flex-1 min-h-screen transition-all duration-300 w-full md:pl-64 lg:pl-64">
              <div className="max-w-[1600px] mx-auto">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
