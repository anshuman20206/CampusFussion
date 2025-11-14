import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, serverTimestamp, arrayUnion, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { firebaseConfig } from "@/firebase/config";

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
