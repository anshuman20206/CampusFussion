// This file is for CLIENT-SIDE usage of the admin SDK, which is generally not recommended.
// It's used here for the real-time admin dashboard as a demonstration.
// In a real production app, you would secure this differently, likely with a dedicated API endpoint.

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: This uses the public web config.
// The security is ENFORCED by Firestore rules which only allow admins to read the 'users' collection.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let adminApp;
const appName = 'firebase-admin-client-app';
if (getApps().some(app => app.name === appName)) {
  adminApp = getApp(appName);
} else {
    if (firebaseConfig.projectId) {
        adminApp = initializeApp(firebaseConfig, appName);
    }
}


export const adminDb = adminApp ? getFirestore(adminApp) : null;
