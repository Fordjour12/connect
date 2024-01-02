import { AuthContext } from "@/context/auth.context";
import { AUTH, DB } from "@/firebase.config";
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { collection, doc, setDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const auth: Auth = AUTH;
  const db = DB;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.emailVerified !== false) {
        setUser(user);
      } else {
        alert("Please verify your email address");
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let userId = response.user.uid.toString();

      const userCollection = collection(db, "user");
      const userDoc = doc(userCollection, userId);

      await setDoc(userDoc, {
        id: response.user.uid,
        name: response.user.displayName,
        email: response.user.email,
        emailVerified: response.user.emailVerified,
      });

      if (response.user.emailVerified === false) {
        await sendEmailVerification(response.user);
      }
    } catch (error: any) {
      const err = error.code;
      alert(err);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + errorMessage);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
