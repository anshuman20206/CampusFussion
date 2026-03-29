import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, Bell, Rocket, Target, Users } from 'lucide-react';

export function About() {
  const features = [
    {
      title: "Workshops & Events",
      description: "Participate in tech seminars, hackathons, and speaker sessions organized by campus leaders.",
      icon: Calendar,
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      title: "Curated Internships",
      description: "Gain access to a hand-picked selection of internships tailored for your skill development.",
      icon: Briefcase,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      title: "Instant Updates",
      description: "Stay in the loop with real-time community announcements and vital campus news.",
      icon: Bell,
      color: "text-pink-500",
      bg: "bg-pink-50"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-black tracking-tight mb-6">What is Campus Fusion?</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Campus Fusion is a centralized digital ecosystem built to empower students. We aggregate industry opportunities, community-led learning, and vital information into a single, sleek interface, ensuring you never miss a chance to grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <Card key={idx} className="border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group bg-card">
            <CardHeader className="pt-8 text-center flex flex-col items-center">
              <div className={`${feature.bg} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`${feature.color} h-8 w-8`} />
              </div>
              <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
