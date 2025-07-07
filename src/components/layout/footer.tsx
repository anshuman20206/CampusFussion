import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-6 py-6 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4" />
            <p className="text-sm">CampusConnect | Global Student Network</p>
        </div>
        <p className="mt-2 text-xs text-muted-foreground/50">
            {new Date().getFullYear()} © All rights reserved.
        </p>
      </div>
    </footer>
  );
}
