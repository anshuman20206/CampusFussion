'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onIdTokenChanged, User } from 'firebase/auth';
import { getFirebaseServices } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { createUserInFirestore } from '@/app/auth/actions';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { auth } = getFirebaseServices();

    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in.
        // Check if the user is new (just signed up)
        const isNewUser = firebaseUser.metadata.creationTime === firebaseUser.metadata.lastSignInTime;
        if (isNewUser) {
          // If it's a new user, create their record in Firestore.
          await createUserInFirestore(firebaseUser.uid, firebaseUser.email, firebaseUser.displayName, firebaseUser.photoURL);
        }
        setUser(firebaseUser);
        const isAuthPage = pathname === '/login' || pathname === '/signup';
        if (isAuthPage) {
          router.replace('/dashboard');
        }
      } else {
        // User is signed out.
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
