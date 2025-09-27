'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onIdTokenChanged, User, getRedirectResult } from 'firebase/auth';
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

    // Handle the result of a redirect authentication
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          // This means a user has just signed in via redirect.
          const user = result.user;
          // Ensure the user record exists in Firestore.
          await createUserInFirestore(user.uid, user.email, user.displayName, user.photoURL);
          // Now that the user is created/verified, redirect to the dashboard.
          router.replace('/dashboard');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error("Redirect result error:", error);
      });

    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      
      const isAuthPage = pathname === '/login' || pathname === '/signup';
      if (firebaseUser && isAuthPage) {
        router.replace('/dashboard');
      }
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
