import { collection, getDocs } from "firebase/firestore";
import { db } from "@/util/firebase";
import CreateTask from "@/components/CreateTask";
import { useEffect, useState } from "react";
import FindAllTask from "@/components/FindAllTask";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

export default function Index() {
  return (
    <main>
      <div className="mx-[10%] mt-10 bg-black-600 w-[80%] h-[1px]"></div>
      <div className="mx-[10%] mt-10 w-[80%] relative pt-16">
        <Link href="/painel/tarefas/nova">
          <div className="absolute top top-0 right-0 w-14 h-14 flex justify-center items-center rounded-lg bg-yellow-800 cursor-pointer hover:bg-yellow-900 transition">
            <IoMdAdd size={30} />
          </div>
        </Link>
        <FindAllTask />
      </div>
    </main>
  );
}
