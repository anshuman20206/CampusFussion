import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, LogOut } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container py-12">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person avatar" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">Here's your personal hub for all things CampusConnect.</p>
            </div>
          </div>
          <Button variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">events you've registered for</p>
              <Button size="sm" variant="link" className="mt-2 px-0" asChild>
                <Link href="/events">View all events</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Announcements</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">new announcements this week</p>
              <Button size="sm" variant="link" className="mt-2 px-0" asChild>
                 <Link href="/announcements">Read announcements</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
             <CardHeader className="pb-2">
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Jump right back into the action.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/chatbot">Talk to AI Assistant</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/community">Join Community Chat</Link>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
