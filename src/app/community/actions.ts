
"use server";

import { getFirebaseServices } from "@/lib/firebase";
import { addDoc, collection }from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { FirestorePermissionError } from "@/firebase/errors";

type ActionResponse = {
  success: boolean;
  error?: string | { name: string; message: string; request: any };
};

export async function shareThoughtAction(formData: FormData): Promise<ActionResponse> {
  const text = formData.get('thought') as string;
  const clubId = formData.get('clubId') as string;

  if (!text || !text.trim()) {
    return { success: false, error: 'Thought cannot be empty.' };
  }
  
  if (!clubId) {
    return { success: false, error: 'Club ID is missing.' };
  }

  const { db } = getFirebaseServices();
  if (!db) {
    return { success: false, error: "Firebase is not configured. Please add your Firebase project details to the .env file." };
  }

  const newThought = {
    text,
    clubId,
    timestamp: new Date(),
  };

  try {
    const thoughtsCollectionRef = collection(db, 'thoughts');
    await addDoc(thoughtsCollectionRef, newThought);

    revalidatePath(`/community/${clubId}`);
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

    return { success: false, error: 'Could not submit your thought. Please check your Firebase configuration and Firestore rules.' };
  }
}
