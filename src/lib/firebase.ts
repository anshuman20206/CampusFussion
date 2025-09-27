import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, serverTimestamp, arrayUnion, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  projectId: "campusconnect-1il6y",
  appId: "1:454378528376:web:b324c8d8a3ace2078cd78d",
  apiKey: "AIzaSyC4a4v80y0evAGtz_pCKGg-IV_e22JDo4U",
  authDomain: "campusconnect-1il6y.firebaseapp.com",
  storageBucket: "campusconnect-1il6y.appspot.com",
  messagingSenderId: "454378528376",
};

interface FirebaseServices {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
  storage: FirebaseStorage;
}

let services: FirebaseServices | null = null;

export function getFirebaseServices(): FirebaseServices {
  if (services) {
    return services;
  }

  // When in development, setting authDomain to null allows signInWithPopup to work
  // on localhost without triggering the unauthorized-domain error.
  const config = process.env.NODE_ENV !== 'production'
    ? { ...firebaseConfig, authDomain: null }
    : firebaseConfig;

  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(config);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  services = { app, db, auth, storage };
  
  return services;
}

export { serverTimestamp, arrayUnion };
