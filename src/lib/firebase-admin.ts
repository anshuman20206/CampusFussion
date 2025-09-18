import * as admin from 'firebase-admin';
import { env } from '@/lib/env';

// This is a singleton pattern to ensure we only initialize the app once.
let app: admin.app.App;

if (!admin.apps.length) {
  try {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  } catch (initError: any) {
    console.error('FIREBASE ADMIN INIT ERROR:', initError.message);
  }
} else {
  app = admin.app();
}

export const auth = app! ? app.auth() : null;
export const adminDb = app! ? app.firestore() : null;
