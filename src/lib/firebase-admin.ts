
import * as admin from 'firebase-admin';

interface FirebaseAdminCredentials {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

let app: admin.app.App | null = null;

function getAdminApp(credentials: FirebaseAdminCredentials): admin.app.App {
  if (app) {
    return app;
  }

  if (admin.apps.length > 0) {
    app = admin.app();
    return app;
  }
  
  try {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: credentials.projectId,
        clientEmail: credentials.clientEmail,
        privateKey: credentials.privateKey.replace(/\\n/g, '\n'),
      }),
    });
  } catch (initError: any) {
    console.error('FIREBASE ADMIN INIT ERROR:', initError.message);
    throw new Error('Failed to initialize Firebase Admin SDK. Check server credentials.');
  }

  return app;
}

export function getAdminAuth(credentials: FirebaseAdminCredentials) {
    return getAdminApp(credentials).auth();
}

export function getAdminDb(credentials: FirebaseAdminCredentials) {
    return getAdminApp(credentials).firestore();
}
