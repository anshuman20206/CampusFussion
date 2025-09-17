'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithCustomToken, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { usePathname, useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

async function getSessionToken() {
  const response = await fetch('/api/auth/session');
  if (response.ok) {
    const data = await response.json();
    return data.token;
  }
  return null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const attemptSignIn = async () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        setLoading(false);
        return;
      }
      
      try {
        const token = await getSessionToken();
        if (token) {
          await signInWithCustomToken(auth, token);
        }
      } catch (error) {
        console.error("Error signing in with custom token:", error);
      }
    };
    
    attemptSignIn();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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