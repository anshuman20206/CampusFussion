"use server";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { FirestorePermissionError } from "@/firebase/errors";
import { getFirebaseServices } from "@/lib/firebase";

type ActionResponse = {
  success: boolean;
  error?: string | { name: string; message: string; request: any };
};

export async function shareThoughtAction(formData: FormData): Promise<ActionResponse> {
  const text = formData.get('thought') as string;

  if (!text || !text.trim()) {
    return { success: false, error: 'Thought cannot be empty.' };
  }
  
  // NOTE: This is a client-side action despite the 'use server' directive.
  // We use getFirebaseServices() which relies on the client-side Firebase context.
  const { db, auth } = getFirebaseServices();
  if (!db || !auth) {
    return { success: false, error: "Firebase is not configured on the client." };
  }

  // This action should only be callable by authenticated users.
  if (!auth.currentUser) {
      return { success: false, error: "You must be logged in to share a thought." };
  }

  const newThought = {
    text,
    clubId: 'general', // Centralized clubId
    timestamp: serverTimestamp(),
    authorId: auth.currentUser.uid, // Track the author
  };

  try {
    const thoughtsCollectionRef = collection(db, 'thoughts');
    await addDoc(thoughtsCollectionRef, newThought);

    revalidatePath(`/community`);
    return { success: true };
  } catch (error: any) {
    console.error("Error adding thought:", error);
    
    if (error.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
            path: `thoughts`,
            operation: 'create',
            requestResourceData: newThought
        });
        
        // Return a serializable version of the error
        return { 
            success: false, 
            error: {
                name: permissionError.name,
                message: permissionError.message,
                request: permissionError.request,
            }
        };
    }

    return { success: false, error: 'Could not submit your thought. Please check your Firestore rules.' };
  }
}
