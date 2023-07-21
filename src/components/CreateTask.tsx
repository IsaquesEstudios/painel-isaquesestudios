"use client"
import { db } from "@/util/firebase";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CreateTask() {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [end, setEnd] = useState<string>();
  const router = useRouter()

  async function HandleCreateTasks(e: FormEvent) {
    e.preventDefault();
    await addDoc(collection(db, "tasks"), {
      title: title,
      description: description,
      created_at: Timestamp.fromDate(new Date()),
      end_at: end,
    })
      .then((e) => {
        console.log(e);

      })
      .catch((e) => {
        console.log(e);
      });
      window.location.reload()
    }

  return (
    <div>
      <form
        className="flex gap-x-10 mt-20 mx-[10%] p-4 "
        onSubmit={HandleCreateTasks}
      >
        <input
          type="text"
          placeholder="Titulo"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="col-span-2 w-[25%]"
        />
        <input
          type="text"
          placeholder="Descrição"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="col-span-2 w-[25%]"
        />
        <input
          type="text"
          placeholder="Entregar"
          onChange={(e) => {
            setEnd(e.target.value);
          }}
          className="col-span-2 w-[25%]"
        />

        <button type="submit" className="col-span-2 bg-black-100 w-[20%]">
          Enviar
        </button>
      </form>
    </div>
  );
}
