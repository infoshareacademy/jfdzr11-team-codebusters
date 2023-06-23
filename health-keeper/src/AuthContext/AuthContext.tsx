import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
  User,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../api/firebase/firebase';
import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

const useAuth = () => {
  return useContext(AuthContext);
};

type AuthContextProps = {
  currentUser: User | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // registration
  function register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //   login
  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout
  function logout() : Promise<void> {
    return signOut(auth);
  }
  // listen for auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextProps = {
    currentUser,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
