import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, serverTimestamp, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  projectId: "campusconnect-1il6y",
  appId: "1:454378528376:web:b324c8d8a3ace2078cd78d",
  apiKey: "AIzaSyC4a4v80y0evAGtz_pCKGg-IV_e22JDo4U",
  authDomain: "campusconnect-1il6y.firebaseapp.com",
  storageBucket: "campusconnect-1il6y.appspot.com",
  messagingSenderId: "454378528376",
};

// Initialize Firebase
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage, serverTimestamp, arrayUnion };
