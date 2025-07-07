'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, Timestamp, limit } from 'firebase/firestore';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorImage: string;
  coverImage: string;
  publishedDate: Date;
}

// Type for a single blog post, which is the same
export type BlogPost = Blog;

export async function getBlogs(): Promise<{ blogs: Blog[], error: string | null }> {
  if (!db) {
    const errorMsg = "Firestore is not initialized. Skipping blog fetching. Make sure Firebase config is in .env";
    console.warn(errorMsg);
    return { blogs: [], error: errorMsg };
  }

  try {
    const blogsRef = collection(db, "blogs");
    const q = query(blogsRef, where("publishedDate", "<=", new Date()));
    
    const querySnapshot = await getDocs(q);
    const blogs = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        authorName: data.authorName,
        authorImage: data.authorImage,
        coverImage: data.coverImage,
        publishedDate: (data.publishedDate as Timestamp).toDate(),
      };
    });
    // sort by date descending
    blogs.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
    return { blogs, error: null };
  } catch (error: any) {
    console.error("Error getting blogs: ", error);
    let errorMessage = "Could not fetch blogs. This might be due to incorrect Firebase security rules or configuration.";
    if (error.code === 'permission-denied') {
        errorMessage = "Could not fetch blogs. The Cloud Firestore API is not enabled for your project or your security rules are not configured to allow reads on the 'blogs' collection. Please check your Firebase console.";
    }
    return { blogs: [], error: errorMessage };
  }
}

export async function getBlogBySlug(slug: string): Promise<{ blog: BlogPost | null, error: string | null }> {
    if (!db) {
        const errorMsg = "Firestore is not initialized. Skipping blog fetching.";
        console.warn(errorMsg);
        return { blog: null, error: errorMsg };
    }

    try {
        const blogsRef = collection(db, 'blogs');
        const q = query(blogsRef, where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { blog: null, error: 'Blog post not found.' };
        }

        const doc = querySnapshot.docs[0];
        const data = doc.data();

        const blog: BlogPost = {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            authorName: data.authorName,
            authorImage: data.authorImage,
            coverImage: data.coverImage,
            publishedDate: (data.publishedDate as Timestamp).toDate(),
        };

        return { blog, error: null };
    } catch (error: any) {
        console.error(`Error getting blog by slug (${slug}): `, error);
        let errorMessage = "Could not fetch blog post. This might be due to incorrect Firebase security rules or configuration.";
        if (error.code === 'permission-denied') {
            errorMessage = "Could not fetch blog post. Your security rules may not be configured to allow reads on the 'blogs' collection. Please check your Firebase console.";
        }
        return { blog: null, error: errorMessage };
    }
}
