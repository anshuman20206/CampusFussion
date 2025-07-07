'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

export interface Thought {
  id: string;
  text: string;
  timestamp: Date;
}

export async function getThoughts(): Promise<Thought[]> {
  if (!db) {
    console.warn("Firestore is not initialized. Skipping thought fetching. Make sure Firebase config is in .env");
    return [];
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
      return thoughts;
  } catch (error) {
      console.error("Error getting thoughts: ", error);
      console.error("This might be due to incorrect Firebase security rules or configuration.");
      return [];
  }
}
