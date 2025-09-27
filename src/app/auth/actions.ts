'use server';

import { auth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Creates a user record in Firestore after a successful sign-in.
 * This is triggered from the client-side after Firebase authentication is complete.
 */
export async function createUserInFirestore(uid: string, email: string | null, displayName: string | null, photoURL: string | null) {
  if (!auth || !db) {
    return {
      error: 'Firebase Admin services not initialized correctly on the server.',
    };
  }

  try {
    // 2. Create user document in Firestore, but don't overwrite existing data on login
    await setDoc(doc(db, "users", uid), {
        email: email,
        displayName: displayName,
        photoURL: photoURL,
        joinedEvents: [],
        participatedHackathons: [],
        createdAt: serverTimestamp(),
        role: "user"
    }, { merge: true }); // Use merge: true to avoid overwriting data on subsequent logins

  } catch (error: any) {
    console.error("Error creating user record:", error);
    return { error: 'An unexpected error occurred while setting up your account.' };
  }

  return { success: true };
}