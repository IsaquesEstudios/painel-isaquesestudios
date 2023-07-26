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
  isAdmin: boolean;
  isAuthenticated: boolean;
};

export const authContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<any>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const isAuthenticated = !!data;

  const auth = getAuth();
  
  useEffect(() => {

    const path = window.location.pathname
    const split = path.split("/")
    const IsAdminRoute = split.includes("admin")
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setData(user)
        if(IsAdminRoute){
          if(user.uid === "zbDrDebZTQcjNtHB4FHzOSUbcun1" || user.uid === "YXtBDuy4peTPwPs3H5zAAzCK9nD3" || user.uid === "ioGRQFR8S3cEyPpSpuyiDwJi27D2"){
            setIsAdmin(true)
          }
        } else {
          setIsAdmin(false)
        }
      } else {
        console.log("não está logado");
      }
    });
  });

  async function signIn({ email, password }: SignInCredentials) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setData(userCredential);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  async function signUp() {}

  return (
    <authContext.Provider value={{ signIn, signUp, data, isAdmin, isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
}
