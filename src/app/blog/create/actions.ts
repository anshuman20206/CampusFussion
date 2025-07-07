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
  if (!db) {
    return {
      success: false,
      error: 'Firestore is not initialized. Please check your Firebase configuration.',
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
    
    let errorMessage = error.message || 'Could not create the blog post. Please try again.';
    if (error.code && (error.code === 'storage/unknown' || error.code === 'storage/unauthorized')) {
        errorMessage = "Image upload failed. This is likely due to Firebase Storage security rules. Please go to your Firebase Console, navigate to Storage > Rules, and ensure your rules allow writes. For development, you can start with `allow read, write: if true;` and secure it later.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }

  redirect(`/blog/${slug}`);
}
