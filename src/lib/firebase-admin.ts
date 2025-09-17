import * as admin from 'firebase-admin';

// This function ensures that we only initialize the app once.
function getAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!privateKey || !clientEmail || !projectId) {
    console.error('Firebase Admin credentials are not set in .env');
    // Return a dummy object or throw an error to prevent the app from trying to use a non-existent service.
    return null;
  }

  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        // When storing a multi-line key in an environment variable, it's often stored as a single line with `\n` characters.
        // We need to replace these with actual newlines for the SDK to parse it correctly.
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    return app;
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
    return null;
  }
}

const adminApp = getAdminApp();

export const auth = adminApp ? adminApp.auth() : null;
export const adminDb = adminApp ? adminApp.firestore() : null;
