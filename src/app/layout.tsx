import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { LayoutShell } from '@/components/layout/layout-shell';
import { Header } from '@/components/layout/header';

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
          <Header />
          <LayoutShell>
            <div className="pt-24">
              {children}
            </div>
          </LayoutShell>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
