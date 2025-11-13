'use server';

import { getFirebaseServices } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { FirestorePermissionError } from '@/firebase/errors';

export interface Thought {
  id: string;
  text: string;
  clubId: string;
  timestamp: Date;
}

export async function getThoughtsByClub(clubId: string): Promise<{ thoughts: Thought[], error: string | null }> {
  const { db } = getFirebaseServices();
  if (!db) {
    const errorMsg = "Firestore is not initialized. Skipping thought fetching. Make sure Firebase config is in .env";
    console.warn(errorMsg);
    return { thoughts: [], error: errorMsg };
  }

  try {
      const thoughtsRef = collection(db, "thoughts");
      const q = query(thoughtsRef, where("clubId", "==", clubId), orderBy("timestamp", "desc"));
      
      const querySnapshot = await getDocs(q);
      const thoughts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
              id: doc.id,
              text: data.text,
              clubId: data.clubId,
              timestamp: (data.timestamp as Timestamp).toDate(),
          };
      });
      return { thoughts, error: null };
  } catch (error: any) {
      if (error.code === 'permission-denied') {
        // Throw a detailed, contextual error for the listener to catch
        throw new FirestorePermissionError({
          path: `thoughts`,
          operation: 'list'
        });
      }

      console.error(`Error getting thoughts for club ${clubId}: `, error);
      
      let errorMessage = "An unexpected error occurred while fetching thoughts.";
       if (error.code === 'failed-precondition') {
        errorMessage = `This query requires a Firestore index. Please create it in your Firebase console. The error message should contain a direct link to create it. Original error: ${error.message}`;
      }
      
      return { thoughts: [], error: errorMessage };
  }
}
