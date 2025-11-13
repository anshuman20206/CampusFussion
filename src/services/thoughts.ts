'use server';

import { getAdminDb } from '@/lib/firebase-admin';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

export interface Thought {
  id: string;
  text: string;
  clubId: string;
  timestamp: Date;
}

export async function getThoughts(): Promise<{ thoughts: Thought[], error: string | null }> {
  try {
    const db = getAdminDb({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    });

    const thoughtsRef = collection(db, "thoughts");
    const q = query(thoughtsRef, orderBy("timestamp", "desc"));
    
    const querySnapshot = await getDocs(q);
    const thoughts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            text: data.text,
            clubId: data.clubId,
            timestamp: (data.timestamp as Timestamp)?.toDate(),
        };
    });
    return { thoughts, error: null };
  } catch (error: any) {
    console.error(`Error getting thoughts: `, error);
    
    let errorMessage = "An unexpected error occurred while fetching thoughts on the server.";
    if (error.message.includes('Google-Auth-Library') || error.message.includes('Failed to parse private key')) {
      errorMessage = "Server authentication failed. Please check your service account credentials in the .env.local file.";
    } else if (error.code === 'failed-precondition') {
        errorMessage = `This query requires a Firestore index. Please create it in your Firebase console. The error message from the server was: ${error.message}`;
    }
    
    return { thoughts: [], error: errorMessage };
  }
}
