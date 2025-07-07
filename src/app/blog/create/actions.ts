'use server';

import { db } from '@/lib/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { blogFormSchema, type BlogFormValues } from './schema';

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
