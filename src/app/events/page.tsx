import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENTS } from "@/lib/constants";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Upcoming Events</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Join our workshops, speaker sessions, and hackathons to learn, build, and connect.
        </p>
      </div>

      <div className="relative mt-12 mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:left-1/2"></div>
        <div className="space-y-12">
          {EVENTS.map((event, index) => (
            <div key={index} className="relative flex items-start gap-6">
              <div className="absolute left-4 top-1 z-10 -translate-x-1/2 transform rounded-full bg-primary p-2 text-primary-foreground md:left-1/2">
                <event.icon className="h-5 w-5" />
              </div>
              <div className="w-full md:w-[calc(50%-1.5rem)] md:text-right">
                <p className={`font-semibold md:mt-1 ${index % 2 !== 0 ? 'md:text-left' : ''}`}>
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <Card className="w-full md:w-[calc(50%-1.5rem)]">
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 pt-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={event.registrationLink}>Register Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
