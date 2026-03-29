import Image from 'next/image';
import images from '@/app/lib/placeholder-images.json';
import { Globe, Users, Zap } from 'lucide-react';

export function GDGSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Zap className="h-3 w-3" />
              Community Driven
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight">
              Powered by Google Developer Group
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As a GDG-powered initiative, Campus Fusion brings Google's spirit of open collaboration and technical excellence to your doorstep. We leverage industry standard methodologies and a global network of experts to deliver unparalleled value to our student members.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white shadow-md flex items-center justify-center text-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Global Standards</h4>
                  <p className="text-sm text-muted-foreground">Learning path aligned with industry giants.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white shadow-md flex items-center justify-center text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Expert Mentors</h4>
                  <p className="text-sm text-muted-foreground">Direct guidance from experienced professionals.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/30 transition-colors" />
            <div className="relative bg-white p-12 rounded-[2rem] shadow-2xl border flex items-center justify-center">
              <Image
                src={images.about.logo.src}
                data-ai-hint={images.about.logo.dataAiHint}
                alt="GDG Chapter Logo"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
