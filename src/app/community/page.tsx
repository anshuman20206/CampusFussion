'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

// Mock data for initial thoughts
const initialThoughts = [
  { id: 1, text: "Just discovered a new VS Code extension that's a game-changer for React development!", timestamp: new Date(Date.now() - 3600 * 1000 * 1) },
  { id: 2, text: "The AI assistant is surprisingly helpful for debugging Python scripts. Saved me hours.", timestamp: new Date(Date.now() - 3600 * 1000 * 3) },
  { id: 3, text: "Who's going to the Firebase workshop next week? Excited to learn more about Firestore rules.", timestamp: new Date(Date.now() - 3600 * 1000 * 5) },
  { id: 4, text: "I wish there were more resources on campus for learning advanced CSS animations.", timestamp: new Date(Date.now() - 3600 * 1000 * 8) },
  { id: 5, text: "The future is definitely built on open source. Great to see so many projects on the community GitHub.", timestamp: new Date(Date.now() - 3600 * 1000 * 12) },
  { id: 6, text: "Thinking about building a project with Gemini. Anyone interested in collaborating?", timestamp: new Date(Date.now() - 3600 * 1000 * 24) },
  { id: 7, text: "The roadmap looks promising. Can't wait for the hackathons!", timestamp: new Date(Date.now() - 3600 * 1000 * 30) },
];

interface Thought {
  id: number;
  text: string;
  timestamp: Date;
}

export default function CommunityPage() {
  const [thoughts, setThoughts] = useState<Thought[]>(initialThoughts);
  const [newThought, setNewThought] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThought.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const thought: Thought = {
        id: Date.now(),
        text: newThought,
        timestamp: new Date(),
      };
      setThoughts([thought, ...thoughts]);
      setNewThought('');
      setIsSubmitting(false);
    }, 500);
  };
  
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 0) return "just now";
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Community Thoughts</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Share your ideas, questions, or random thoughts with the community. All anonymous.
        </p>
      </div>

      <Card className="mt-12 mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Share a Thought</CardTitle>
          <CardDescription>What's on your mind?</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Textarea
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
              placeholder="e.g., 'What's the best way to manage state in large React apps?'"
              rows={4}
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={isSubmitting || !newThought.trim()} className="self-end">
              {isSubmitting ? 'Sharing...' : 'Share Anonymously'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-12 mx-auto max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-center">Latest from the Community</h2>
        <div className="space-y-4">
            {thoughts.slice(0, visibleCount).map((thought) => (
                <Card key={thought.id}>
                  <CardContent className="pt-6">
                    <p className="text-foreground">{thought.text}</p>
                    <p className="text-sm text-muted-foreground mt-4">{timeAgo(thought.timestamp)}</p>
                  </CardContent>
                </Card>
            ))}
        </div>
        {visibleCount < thoughts.length && (
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => setVisibleCount(visibleCount + 5)}>
              Show More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
