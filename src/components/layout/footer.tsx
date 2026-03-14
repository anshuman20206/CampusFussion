
'use client';

import { Globe, Lock } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-primary/20 mt-12 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
              <Globe className="h-5 w-5" />
              <p className="text-sm font-mono">TRANSMITTING FROM GLOBAL NODE_ID: 793a_2f1b</p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/admin" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
            >
              <Lock className="h-3 w-3 group-hover:scale-110 transition-transform" />
              Admin Portal
            </Link>
            <p className="text-xs text-muted-foreground/50 font-mono">
                {new Date().getFullYear()} © CampusFusion // Grid Initialized
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
