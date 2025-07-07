import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENTS } from "@/lib/constants";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

      <div className="relative mt-12 mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
        <div className="space-y-12">
          {sortedEvents.map((event, index) => (
            <div key={index} className="relative pl-12">
              <div className="absolute left-4 top-1 z-10 -translate-x-1/2 transform rounded-full bg-primary p-2 text-primary-foreground">
                <event.icon className="h-5 w-5" />
              </div>
              <Card>
                <CardHeader>
                   <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center">
                      <CardTitle>{event.name}</CardTitle>
                      <p className="font-semibold text-sm text-muted-foreground mt-2 sm:mt-0">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                   </div>
                  <CardDescription className="flex items-center gap-2 pt-2">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </CardDescription>
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
          ))}
        </div>
      </div>
    </div>
  );
}
