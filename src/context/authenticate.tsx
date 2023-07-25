"use client";
import { Api } from "@/util/axios";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { createContext, ReactNode, useEffect, useState } from "react";
import router from "next/navigation";

import "./../util/firebase";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type DataUser = {
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: any;
  uid: string;
  photoURL: string;
  metadata: {
    createdAt: string;
    creationTime: string;
    lastLoginAt: string;
    LastSignInTime: string;
  };
  reloadUserInfo: {
    passwordUpdatedAt: number;
  };
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<any>;
  signUp(credentials: SignInCredentials): Promise<void>;
  data: DataUser;
  isAuthenticated: boolean;
};

const LinkDevelopment = "http://localhost:3333";

export const authContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<any>();
  const isAuthenticated = !!data;

  const auth = getAuth();

  useEffect(() => {
    console.log(data);
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setData(user);
        if (window.location.pathname === "/") {
          window.location.href = "/painel";
        }
      } else {
        console.log("não está logado");
      }
    });
  });

  async function signIn({ email, password }: SignInCredentials) {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...

          setData(userCredential);
          console.log("logou");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          console.log(errorMessage);
        });

      // Router.push("/usuario");
    } catch (error) {
      console.log(error);
    }
  }

  async function signUp() {}

  return (
    <authContext.Provider value={{ signIn, signUp, data, isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
}
