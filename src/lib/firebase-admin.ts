import * as admin from 'firebase-admin';
import '@/lib/env';

let app: admin.app.App;

try {
  app = admin.app();
} catch (error) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!privateKey || !clientEmail || !projectId) {
    console.error(
      'Firebase Admin credentials are not fully set in .env. Required: FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, NEXT_PUBLIC_FIREBASE_PROJECT_ID'
    );
  } else {
    try {
      app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    } catch (initError: any) {
      console.error('Firebase admin initialization error:', initError.stack);
    }
  }
}

export const auth = app! ? app!.auth() : null;
export const adminDb = app! ? app!.firestore() : null;
