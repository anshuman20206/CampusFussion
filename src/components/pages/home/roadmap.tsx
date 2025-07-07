import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROADMAP_PHASES } from '@/lib/constants';

export function Roadmap() {
  return (
    <section id="roadmap" className="bg-muted">
      <div className="container mx-auto px-6 py-16 text-center md:py-24">
        <h2 className="text-3xl font-bold tracking-tight">Our Roadmap</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Our journey is just beginning. Here's a look at what we have planned to continuously empower our community.
        </p>
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          <div className="grid gap-8 md:grid-cols-1">
            {ROADMAP_PHASES.map((phase, index) => (
              <div key={phase.title} className="relative flex w-full items-center">
                <div className="absolute left-1/2 z-10 -translate-x-1/2 transform rounded-full bg-primary p-2 text-primary-foreground">
                  <phase.icon className="h-6 w-6" />
                </div>
                <Card className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:ml-auto md:text-left' : 'md:mr-auto md:text-left'}`}>
                  <CardHeader>
                    <CardTitle>{phase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
