'use server';

import { getFirebaseServices, arrayUnion } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function joinEvent(uid: string, eventName: string) {
  const { db } = getFirebaseServices();
  if (!db || !uid) return { error: 'User not authenticated or DB not available.' };

  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      joinedEvents: arrayUnion(eventName),
    });
    return { success: true };
  } catch (error) {
    console.error('Error joining event:', error);
    return { error: 'Could not join event.' };
  }
}

export async function participateHackathon(uid: string, hackathonName: string) {
  const { db } = getFirebaseServices();
  if (!db || !uid) return { error: 'User not authenticated or DB not available.' };

  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      participatedHackathons: arrayUnion(hackathonName),
    });
    return { success: true };
  } catch (error) {
    console.error('Error participating in hackathon:', error);
    return { error: 'Could not participate in hackathon.' };
  }
}
