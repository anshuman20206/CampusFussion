'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const blogFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters long.' }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase with words separated by dashes (e.g., my-new-post).' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters long.' }).max(200, { message: 'Excerpt cannot be longer than 200 characters.' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters long.' }),
  authorName: z.string().min(2, { message: 'Author name is required.' }),
  authorImage: z.string().url({ message: 'Please enter a valid URL for the author image.' }).optional().or(z.literal('')),
  coverImage: z.string().url({ message: 'Please enter a valid URL for the cover image.' }).optional().or(z.literal('')),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;

export async function createBlogAction(values: BlogFormValues) {
  if (!db) {
    return {
      success: false,
      error: 'Firestore is not initialized. Please check your Firebase configuration.',
    };
  }

  const validatedFields = blogFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid fields. Please check your input.',
    };
  }
  
  const { slug, ...restOfData } = validatedFields.data;

  try {
    await addDoc(collection(db, 'blogs'), {
      ...restOfData,
      slug: slug,
      publishedDate: Timestamp.fromDate(new Date()),
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
  } catch (error) {
    console.error("Error creating blog post: ", error);
    return {
      success: false,
      error: 'Could not create the blog post. Please try again.',
    };
  }

  redirect(`/blog/${slug}`);
}
