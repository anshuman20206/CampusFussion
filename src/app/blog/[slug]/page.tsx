import { getBlogBySlug } from '@/services/blogs';
import { notFound } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import { Card } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

interface BlogSlugPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { blog, error } = await getBlogBySlug(params.slug);

  if (error && !blog) {
    return (
      <div className="container mx-auto px-6 py-12">
        <Alert variant="destructive" className="mt-8 mx-auto max-w-3xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Post</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <article className="space-y-8">
        <div className="space-y-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{blog.title}</h1>
            <div className="flex justify-center items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={blog.authorImage} alt={blog.authorName} />
                        <AvatarFallback>
                            <User className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                    <span>{blog.authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={blog.publishedDate.toISOString()}>
                        {new Date(blog.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                </div>
            </div>
        </div>

        <Card className="overflow-hidden">
            <div className="relative aspect-video">
                <Image
                src={blog.coverImage || 'https://placehold.co/1200x600.png'}
                data-ai-hint="technology abstract"
                alt={blog.title}
                fill
                className="object-cover"
                />
            </div>
        </Card>

        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
