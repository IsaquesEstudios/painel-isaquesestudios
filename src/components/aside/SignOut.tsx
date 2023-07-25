import { AiOutlineProfile } from "react-icons/ai";
import ItemAside from "./ItemAside";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";

export default function SignOut() {
  function HandleSignOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <li>
      <Link
        href="/"
        className={`flex gap-1 text-xl items-center justify-center py-6 hover:bg-yellow-800 hover:text-black-800`}
        onClick={HandleSignOut}
      >
        <IoExitOutline  className="mr-1"/> Sair
      </Link>
    </li>
  );
}
