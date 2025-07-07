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

      <div className="relative mt-16 max-w-5xl mx-auto">
        {/* Vertical timeline bar */}
        <div className="absolute left-5 top-0 h-full w-0.5 bg-border -translate-x-1/2 md:left-1/2"></div>

        <div className="space-y-16">
          {sortedEvents.map((event, index) => (
            <div key={index} className="relative">
              {/* Timeline Dot */}
              <div className="absolute top-1 left-5 z-10 -translate-x-1/2 transform rounded-full bg-primary p-2 text-primary-foreground ring-8 ring-background md:left-1/2">
                <event.icon className="h-5 w-5" />
              </div>

              {/* Card and content */}
              <div className={cn(
                "pl-16 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0",
                index % 2 !== 0 && "md:[&>div:first-child]:order-last"
              )}>
                <div className={cn(index % 2 !== 0 && "md:text-right")}>
                  <Card>
                    <CardHeader>
                      <p className="font-semibold text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <CardTitle>{event.name}</CardTitle>
                      <CardDescription className={cn(
                        "flex items-center gap-2 pt-2",
                        index % 2 !== 0 && "md:justify-end"
                      )}>
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                    {event.link && (
                      <CardFooter className={cn(index % 2 !== 0 && "md:justify-end")}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}