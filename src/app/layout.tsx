import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const font = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
  display: 'swap',
});

const headlineFont = Inter({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CampusConnect',
  description: 'Empowering Developers. Building Tech Communities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        'min-h-screen font-sans antialiased', 
        font.variable,
        headlineFont.variable
      )}>
          <div className="relative flex min-h-dvh flex-col bg-background/80">
            <Header />
            <main className="flex-1 flex">{children}</main>
            <Footer />
          </div>
          <Toaster />
      </body>
    </html>
  );
}
