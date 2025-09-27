'use server';

import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function getCredentials() {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Missing Firebase Admin credentials. Make sure .env.local is configured correctly.');
    }

    return { projectId, clientEmail, privateKey };
}


/**
 * Creates a user record in Firestore after a successful sign-in.
 * This is triggered from the client-side after Firebase authentication is complete.
 */
export async function createUserInFirestore(uid: string, email: string | null, displayName: string | null, photoURL: string | null) {
  try {
    const credentials = getCredentials();
    const adminDb = getAdminDb(credentials);

    const userRef = doc(adminDb, "users", uid);
    const userDoc = await getDoc(userRef);

    // Only create a new document if one doesn't already exist.
    if (!userDoc.exists()) {
        await setDoc(userRef, {
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            joinedEvents: [],
            participatedHackathons: [],
            createdAt: serverTimestamp(),
            role: "user"
        });
    }
  } catch (error: any) {
    console.error("Error creating user record:", error);
    return { error: `An unexpected error occurred while setting up your account. Server error: ${error.message}` };
  }

  return { success: true };
}

export async function logoutAction() {
  cookies().delete('session');
  redirect('/login');
}
