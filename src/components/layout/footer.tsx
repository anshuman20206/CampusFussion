import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-6 py-6 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-3 text-muted-foreground">
            <Globe className="h-5 w-5" />
            <p className="text-sm">TRANSMITTING FROM GLOBAL NODE_ID: 793a_2f1b</p>
        </div>
        <p className="mt-4 text-xs text-muted-foreground/50">
            {new Date().getFullYear()} © CampusConnect // Grid Initialized // Secure Connection Established
        </p>
      </div>
    </footer>
  );
}
