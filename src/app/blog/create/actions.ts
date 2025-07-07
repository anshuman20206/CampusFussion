'use server';

import { db, storage } from '@/lib/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { blogFormSchema } from './schema';
import { moderateContent } from '@/ai/flows/moderate-content';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

async function uploadFile(file: File): Promise<string> {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized.');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size should be less than 5MB.`);
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(`Only .jpeg, .jpg, .png and .webp formats are supported.`);
  }

  const storageRef = ref(storage, `blogs/${Date.now()}-${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

export async function createBlogAction(formData: FormData) {
  if (!db || !storage) {
    return {
      success: false,
      error: 'Firestore or Storage is not initialized. Please check your Firebase configuration in .env and lib/firebase.ts.',
    };
  }
  
  if (!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) {
    return {
        success: false,
        error: "Firebase Storage Bucket is not configured. Please add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET to your .env file."
    };
  }

  const formValues = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    authorName: formData.get('authorName'),
    authorImage: formData.get('authorImage'),
    coverImage: formData.get('coverImage'),
  };

  const validatedFields = blogFormSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid fields: ' + validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { title, slug, excerpt, content, authorName } = validatedFields.data;
  const authorImageFile = formData.get('authorImage') as File | null;
  const coverImageFile = formData.get('coverImage') as File | null;

  try {
    // 1. Moderate content
    const moderationResult = await moderateContent({ content });
    if (!moderationResult.isSafe) {
      return {
        success: false,
        error: `Content moderation failed: ${moderationResult.reason || 'Harmful content detected.'}`,
      };
    }

    // 2. Upload images if they exist
    let authorImageUrl = '';
    if (authorImageFile && authorImageFile.size > 0) {
      authorImageUrl = await uploadFile(authorImageFile);
    }

    let coverImageUrl = '';
    if (coverImageFile && coverImageFile.size > 0) {
      coverImageUrl = await uploadFile(coverImageFile);
    }
    
    // 3. Add to Firestore
    await addDoc(collection(db, 'blogs'), {
      title,
      slug,
      excerpt,
      content,
      authorName,
      authorImage: authorImageUrl,
      coverImage: coverImageUrl,
      publishedDate: Timestamp.fromDate(new Date()),
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
  } catch (error: any) {
    console.error("Error creating blog post: ", error);
    
    let errorMessage = `Could not create the blog post. Please try again. Error: ${error.message}`;

    if (error.code && ['storage/unauthorized', 'storage/unknown'].includes(error.code)) {
        errorMessage = "Image upload failed. This is a configuration issue. Please check these three things: 1) Your Storage security rules in the Firebase Console are correct (for dev, `allow read, write: if true;`). 2) The `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` variable in your .env file is correct. 3) Your bucket's CORS policy allows requests from your local development environment.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }

  redirect(`/blog/${slug}`);
}
