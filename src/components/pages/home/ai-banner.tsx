import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BrainCircuit } from 'lucide-react';

const aiCapabilities = [
  "Programming doubt-solving (Python, Java, React, etc.)",
  "Resume and interview tips",
  "Event information and resources",
  "Tech stack advice",
];

export function AiBanner() {
  return (
    <section id="ai-banner" className="bg-transparent">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <Card className="overflow-hidden bg-gradient-to-br from-secondary/80 to-primary/80 text-primary-foreground">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold tracking-tight">
                Meet Your CampusConnect AI Assistant
              </h2>
              <p className="mt-4 text-foreground/80">
                Stuck on a problem or need career advice? Our Gemini-powered AI is here to help you 24/7.
              </p>
              <ul className="mt-6 space-y-2 font-body">
                {aiCapabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="text-foreground/90">{cap}</span>
                  </li>
                ))}
              </ul>
              <Button variant="default" size="lg" asChild className="mt-8">
                <Link href="/chatbot">Engage AI Assistant</Link>
              </Button>
            </div>
            <div className="hidden items-center justify-center p-8 md:flex">
               <BrainCircuit className="h-48 w-48 text-accent/50 animate-pulse" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
