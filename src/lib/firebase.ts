import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, serverTimestamp, arrayUnion, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4a4v80y0evAGtz_pCKGg-IV_e22JDo4U",
  authDomain: "campusconnect-1il6y.firebaseapp.com",
  projectId: "campusconnect-1il6y",
  storageBucket: "campusconnect-1il6y.firebasestorage.app",
  messagingSenderId: "454378528376",
  appId: "1:454378528376:web:94c3841f5e4f745c8cd78d"
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

  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  services = { app, db, auth, storage };
  
  return services;
}

export { serverTimestamp, arrayUnion };
