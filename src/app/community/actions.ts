
"use server";

import { getFirebaseServices } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function shareThoughtAction(formData: FormData) {
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

  try {
    await addDoc(collection(db, 'thoughts'), {
      text,
      clubId,
      timestamp: new Date(),
    });

    revalidatePath(`/community/${clubId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error adding thought:", error);
    let errorMessage = 'Could not submit your thought. Please check your Firebase configuration and Firestore rules.';
    if (error.code === 'permission-denied') {
        errorMessage = `Could not submit thought. Your security rules are not configured to allow writes on the 'thoughts' collection. For development, go to your Firebase Console -> Firestore -> Rules and use:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all collections for development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;
    }
    return { success: false, error: errorMessage };
  }
}
