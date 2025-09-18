'use server';
import '@/lib/env';
import { auth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(data: {email: string, password: string}) {
  if (!auth) {
    return {
      error: 'Admin SDK not initialized. Please check your service account configuration in .env and server logs for initialization errors.',
    };
  }

  try {
    const { email } = data;
    // We don't actually use the password on the server side with custom tokens
    // But we need a user record to exist. We assume it does from signup.
    const userRecord = await auth.getUserByEmail(email);
    
    // Create a custom token
    const customToken = await auth.createCustomToken(userRecord.uid);
    
    // Set cookie
    cookies().set('session', customToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: '/',
    });

  } catch (error: any) {
    let message = 'An unexpected error occurred.';
    if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email address.';
    } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password. Please try again.';
    } else if (error.code === 'auth/invalid-credential') {
        message = 'Invalid credentials provided.';
    }
    return { error: message };
  }
  
  redirect('/dashboard');
}

export async function logoutAction() {
    cookies().delete('session');
    redirect('/login');
}
