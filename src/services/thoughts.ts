'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

export interface Thought {
  id: string;
  text: string;
  timestamp: Date;
}

export async function getThoughts(): Promise<{ thoughts: Thought[], error: string | null }> {
  if (!db) {
    const errorMsg = "Firestore is not initialized. Skipping thought fetching. Make sure Firebase config is in .env";
    console.warn(errorMsg);
    return { thoughts: [], error: errorMsg };
  }

  try {
      const thoughtsRef = collection(db, "thoughts");
      const q = query(thoughtsRef, orderBy("timestamp", "desc"));
      
      const querySnapshot = await getDocs(q);
      const thoughts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
              id: doc.id,
              text: data.text,
              timestamp: (data.timestamp as Timestamp).toDate(),
          };
      });
      return { thoughts, error: null };
  } catch (error: any) {
      console.error("Error getting thoughts: ", error);
      let errorMessage = "Could not fetch thoughts. This might be due to incorrect Firebase security rules or configuration.";
      if (error.code === 'permission-denied') {
          errorMessage = "Could not fetch thoughts. The Cloud Firestore API is not enabled for your project or your security rules are not configured to allow reads on the 'thoughts' collection. Please check your Firebase console.";
      }
      return { thoughts: [], error: errorMessage };
  }
}
