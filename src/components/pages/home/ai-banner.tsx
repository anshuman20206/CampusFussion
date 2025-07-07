import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const aiCapabilities = [
  "Programming doubt-solving (Python, Java, React, etc.)",
  "Resume and interview tips",
  "Event information and resources",
  "Tech stack advice",
];

export function AiBanner() {
  return (
    <section id="ai-banner" className="bg-secondary/50">
      <div className="container py-16 md:py-24">
        <Card className="overflow-hidden bg-primary text-primary-foreground shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold tracking-tight">
                Meet Your CampusConnect AI Assistant
              </h2>
              <p className="mt-4 text-primary-foreground/80">
                Stuck on a problem or need career advice? Our Gemini-powered AI is here to help you 24/7.
              </p>
              <ul className="mt-6 space-y-2">
                {aiCapabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" size="lg" asChild className="mt-8">
                <Link href="/chatbot">Talk to AI Assistant</Link>
              </Button>
            </div>
            <div className="hidden items-center justify-center bg-primary/80 p-8 md:flex">
              <div className="h-48 w-48 animate-pulse rounded-full bg-primary-foreground/10"></div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
