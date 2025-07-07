'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { blogFormSchema, type BlogFormValues, createBlogAction } from './actions';
import { useTransition } from 'react';
import { PenSquare } from 'lucide-react';

export default function CreateBlogPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      authorName: '',
      authorImage: '',
      coverImage: '',
    },
  });

  const onSubmit = (values: BlogFormValues) => {
    startTransition(async () => {
        const result = await createBlogAction(values);
        if (result?.error) {
            toast({
                variant: 'destructive',
                title: 'Something went wrong.',
                description: result.error,
            });
        } else {
            toast({
                title: 'Success!',
                description: 'Your blog post has been created.',
            });
        }
    });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <PenSquare className="h-8 w-8 text-primary" />
            <div>
                <CardTitle>Create a New Blog Post</CardTitle>
                <CardDescription>Fill out the form below to publish a new article.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Amazing Blog Post Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="your-amazing-blog-post-title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the URL-friendly version of the title. Use lowercase letters and dashes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short, catchy summary of your article."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      A brief summary that will be shown on the main blog page (max 200 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your full blog post here. Markdown is supported."
                        className="min-h-[250px]"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      The main content of your article. You can use Markdown for formatting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="authorName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Author Name</FormLabel>
                        <FormControl>
                        <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="authorImage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Author Image URL</FormLabel>
                        <FormControl>
                        <Input placeholder="https://placehold.co/100x100.png" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://placehold.co/1200x600.png" {...field} />
                    </FormControl>
                     <FormDescription>
                      The main image for your blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Publishing...' : 'Publish Post'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
