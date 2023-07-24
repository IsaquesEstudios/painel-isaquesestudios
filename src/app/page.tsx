"use client";
import { FormEvent, useContext, useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import "./../util/firebase";
import { authContext } from "@/context/authenticate";

import { AiOutlineGooglePlus } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const { signIn } = useContext(authContext);
  const providerGoogle = new GoogleAuthProvider();
  const providerFacebook = new FacebookAuthProvider();

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
    e.preventDefault();
    await signIn({ email, password });
  }

  function HandleSignInGoogle() {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function HandleSignInFacebook() {
    signInWithPopup(auth, providerFacebook)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential:any = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
  
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      console.log(result)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
      console.log(error)
    });
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

          <div className="flex gap-x-5">
            <div
              className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center cursor-pointer"
              onClick={HandleSignInGoogle}
            >
              <AiOutlineGooglePlus size={26} />
            </div>
            <div
              className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center cursor-pointer"
              onClick={HandleSignInFacebook}
            >
              <FaFacebookF size={20} />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
