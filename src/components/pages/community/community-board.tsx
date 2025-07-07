'use client';

import { useState, useTransition, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { shareThoughtAction } from '@/app/community/actions';
import type { Thought } from '@/services/thoughts';
import { useToast } from '@/hooks/use-toast';

const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
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

export function CommunityBoard({ initialThoughts }: { initialThoughts: Thought[] }) {
    const [visibleCount, setVisibleCount] = useState(5);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await shareThoughtAction(formData);
            if (result?.success) {
                formRef.current?.reset();
                 toast({
                    title: "Success!",
                    description: "Your thought has been shared.",
                });
            } else if (result?.error) {
                toast({
                    variant: "destructive",
                    title: "Oops! Something went wrong.",
                    description: result.error,
                });
            }
        });
    };

    return (
        <>
            <Card className="mt-12 mx-auto max-w-3xl">
                <CardHeader>
                    <CardTitle>Share a Thought</CardTitle>
                    <CardDescription>What's on your mind?</CardDescription>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
                        <Textarea
                            name="thought"
                            placeholder="e.g., 'What's the best way to manage state in large React apps?'"
                            rows={4}
                            disabled={isPending}
                            required
                        />
                        <Button type="submit" disabled={isPending} className="self-end">
                            {isPending ? 'Sharing...' : 'Share Anonymously'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-12 mx-auto max-w-3xl space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-center">Latest from the Community</h2>
                <div className="space-y-4">
                    {initialThoughts.slice(0, visibleCount).map((thought) => (
                        <Card key={thought.id}>
                            <CardContent className="pt-6">
                                <p className="text-foreground">{thought.text}</p>
                                <p className="text-sm text-muted-foreground mt-4">{timeAgo(thought.timestamp)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {visibleCount < initialThoughts.length && (
                    <div className="text-center mt-8">
                        <Button variant="outline" onClick={() => setVisibleCount(visibleCount + 5)}>
                            Show More
                        </Button>
                    </div>
                )}
                 {initialThoughts.length === 0 && (
                    <p className="text-center text-muted-foreground mt-8">No thoughts have been shared yet. Be the first!</p>
                 )}
            </div>
        </>
    );
}
