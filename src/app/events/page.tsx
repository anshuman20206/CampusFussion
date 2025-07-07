import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENTS } from "@/lib/constants";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const sortedEvents = [...EVENTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Events</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join our workshops, speaker sessions, and hackathons to learn, build, and connect.
        </p>
      </div>

      <div className="relative mt-16 max-w-4xl mx-auto">
        <div className="absolute left-6 top-2 h-full w-0.5 bg-border -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {sortedEvents.map((event, index) => (
            <div key={index} className="relative flex items-start gap-6 sm:gap-8">
              <div className="z-10 mt-1 h-12 w-12 flex-shrink-0 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <event.icon className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex-grow pt-1">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                            <CardDescription>
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </CardDescription>
                            <CardTitle className="mt-1">{event.name}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                  {event.link && (
                    <CardFooter>
                      <Button asChild>
                        <Link href={event.link} target="_blank" rel="noopener noreferrer">
                          Register Now
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
