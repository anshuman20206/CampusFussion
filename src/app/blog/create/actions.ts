'use server';

import { db } from '@/lib/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { blogFormSchema } from './schema';
import { moderateContent } from '@/ai/flows/moderate-content';

export async function createBlogAction(formData: FormData) {
  if (!db) {
    return {
      success: false,
      error: 'Firestore is not initialized. Please check your Firebase configuration in .env and lib/firebase.ts.',
    };
  }
  
  const formValues = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    authorName: formData.get('authorName'),
  };

  const validatedFields = blogFormSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid fields: ' + validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { title, slug, excerpt, content, authorName } = validatedFields.data;

  try {
    // 1. Moderate content
    const moderationResult = await moderateContent({ content });
    if (!moderationResult.isSafe) {
      return {
        success: false,
        error: `Content moderation failed: ${moderationResult.reason || 'Harmful content detected.'}`,
      };
    }
    
    // 2. Add to Firestore
    await addDoc(collection(db, 'blogs'), {
      title,
      slug,
      excerpt,
      content,
      authorName,
      publishedDate: Timestamp.fromDate(new Date()),
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
  } catch (error: any) {
    console.error("Error creating blog post: ", error);
    
    let errorMessage = `Could not create the blog post. Please try again. Error: ${error.message}`;
    if (error.code === 'permission-denied') {
        errorMessage = "Could not create blog post. Your security rules are not configured to allow writes on the 'blogs' collection. Please check the Rules tab in your Firebase Firestore console.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }

  redirect(`/blog/${slug}`);
}
