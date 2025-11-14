import { getBlogs } from '@/services/blogs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowRight, PenSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const { blogs, error } = await getBlogs();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center text-center mb-8 flex-col sm:flex-row gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight">Tech & Innovation Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Insights, tutorials, and stories from the CampusFusion community.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/blog/create">
            <PenSquare className="mr-2 h-5 w-5" />
            Create Post
          </Link>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-8 mx-auto max-w-4xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could Not Load Blogs</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {blogs.length === 0 && !error && (
        <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold">No Posts Yet</h2>
            <p className="text-muted-foreground mt-2">It looks like there are no blog posts here. Add some to your 'blogs' collection in Firestore!</p>
        </div>
      )}

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {blogs.map((blog) => (
          <Card key={blog.id} className="group flex flex-col overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl">{blog.title}</CardTitle>
              <CardDescription>
                Posted on {new Date(blog.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} by {blog.authorName}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{blog.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/blog/${blog.slug}`}>
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
