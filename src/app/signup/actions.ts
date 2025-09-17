'use server';

import { config } from 'dotenv';
config();

import { auth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signupAction(data: {email: string, password: string}) {
  if (!process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    return {
      error: 'Firebase Admin credentials are not set in .env. Cannot create user. Please add FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.',
    };
  }

  if (!auth || !db) {
    return {
      error: 'Firebase services not initialized correctly.',
    };
  }

  const { email, password } = data;

  try {
    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
    });
    
    const uid = userRecord.uid;

    // 2. Create user document in Firestore
    await setDoc(doc(db, "users", uid), {
        email: email,
        joinedEvents: [],
        participatedHackathons: [],
        createdAt: serverTimestamp(),
        role: "user"
    });

    // 3. Create session cookie
    const customToken = await auth.createCustomToken(uid);
    cookies().set('session', customToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/',
    });

  } catch (error: any) {
    console.error("Signup error:", error.code, error.message);
    let message = 'An unexpected error occurred during signup.';
    if (error.code === 'auth/email-already-exists') {
        message = 'This email address is already in use by another account.';
    } else if (error.code === 'auth/invalid-password') {
        message = 'The password must be a string with at least six characters.';
    }
    return { error: message };
  }
  
  redirect('/dashboard');
}
