import type {Metadata} from 'next';
import './globals.css';
import { Saira_Stencil_One, IBM_Plex_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const headlineFont = Saira_Stencil_One({ 
  subsets: ['latin'], 
  weight: "400",
  variable: '--font-headline',
  display: 'swap',
});

const bodyFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ["400", "700"],
  variable: '--font-body',
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
        headlineFont.variable, 
        bodyFont.variable
      )}>
        <div className="relative flex min-h-dvh flex-col bg-gradient-to-br from-sunset-dark via-sunset-mid to-sunset-light">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
