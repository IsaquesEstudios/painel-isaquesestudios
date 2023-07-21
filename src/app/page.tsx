"use client";
import { FormEvent, useContext, useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import "./../util/firebase";
import { authContext } from "@/context/authenticate";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const { signIn } = useContext(authContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (window.location.pathname === "/") {
          window.location.href = "/painel";
        }
      } else {
        console.log(user);
      }
    });
  });
  
  async function HandleSignIn(e: FormEvent) {
    e.preventDefault()
    await signIn({ email, password });
  }


  return (
    <main className="flex items-center justify-center min-h-screen">
      <form
        className="h-[450px] w-[600px] border-[1px] border-black-700 shadow-2xl flex items-center justify-center"
        onSubmit={HandleSignIn}
      >
        <div className="flex flex-col gap-y-4 max-w-[80%] w-[100%]">
          <input
            type="text"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />

          <button className="bg-yellow-800 py-2 rounded-md" type="submit">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
