
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
    const moderationResult = await moderateContent({ content });
    if (!moderationResult.isSafe) {
      return {
        success: false,
        error: `Content moderation failed: ${moderationResult.reason || 'Harmful content detected.'}`,
      };
    }
    
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
        errorMessage = `Could not create blog post. Your security rules are not configured to allow writes on the 'blogs' collection. For development, go to your Firebase Console -> Firestore -> Rules and use:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{blogId} {
      allow read, write: if true;
    }
    match /thoughts/{thoughtId} {
      allow read, write: if true;
    }
  }
}`;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }

  redirect(`/blog/${slug}`);
}
