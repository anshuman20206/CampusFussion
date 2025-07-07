"use server";

import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function shareThoughtAction(formData: FormData) {
  const text = formData.get('thought') as string;

  if (!text || !text.trim()) {
    return { success: false, error: 'Thought cannot be empty.' };
  }

  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    return { success: false, error: "Firebase is not configured. Please add your Firebase project details to the .env file." };
  }

  try {
    await addDoc(collection(db, 'thoughts'), {
      text,
      timestamp: new Date(),
    });

    revalidatePath('/community');
    return { success: true };
  } catch (error: any) {
    console.error("Error adding thought:", error);
    let errorMessage = 'Could not submit your thought. Please check your Firebase configuration and Firestore rules.';
    if (error.code === 'permission-denied') {
        errorMessage = "Could not submit thought. The Cloud Firestore API is not enabled for your project or your security rules are not configured to allow writes on the 'thoughts' collection. Please check your Firebase console.";
    }
    return { success: false, error: errorMessage };
  }
}
