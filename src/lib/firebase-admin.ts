import * as admin from 'firebase-admin';

// This function ensures that we only initialize the app once.
function getAdminApp() {
  // If the app is already initialized, return it.
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  // Check if all required environment variables are present.
  if (!privateKey || !clientEmail || !projectId) {
    console.error('Firebase Admin credentials are not fully set in .env. Required: FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, NEXT_PUBLIC_FIREBASE_PROJECT_ID');
    return null;
  }

  try {
    // Initialize the app with the credentials.
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        // This is the crucial part: environment variables store newlines as "\\n".
        // We must replace them with actual newline characters for the key to be valid.
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    return app;
  } catch (error: any) {
    // Log the full error to the console for better debugging.
    console.error('Firebase admin initialization error:', error.stack);
    return null;
  }
}

const adminApp = getAdminApp();

// Export the auth and firestore services. They will be null if initialization failed.
export const auth = adminApp ? adminApp.auth() : null;
export const adminDb = adminApp ? adminApp.firestore() : null;
