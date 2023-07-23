"use client";
import { db } from "@/util/firebase";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateTask() {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [responsible, setResponsible] = useState<string>();
  const [valueOfTask, setValueOfTask] = useState<string>();
  const [end, setEnd] = useState<any>();
  const router = useRouter();

  async function HandleCreateTasks(e: FormEvent) {
    e.preventDefault();
    const DateFormat = end.replace(/-/g, ",");
    const EndDate = new Date(DateFormat);

    console.log(responsible);

    const id = uuidv4();

    await addDoc(collection(db, "tasks"), {
      uuid: id,
      title: title,
      description: description,
      responsible: responsible,
      value_of_task: valueOfTask,
      created_at: Timestamp.fromDate(new Date()),
      status: false,
      end_at: EndDate,
    })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
    window.location.reload();
  }

  return (
    <div>
      <form
        className="flex gap-x-10 mt-20 mx-[10%] p-4 flex-col"
        onSubmit={HandleCreateTasks}
      >
        <input
          type="text"
          placeholder="Titulo"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="col-span-2 w-full mb-4 text-black-800"
        />
        <textarea
          placeholder="Descrição"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="col-span-2 w-full h-52 mb-4 text-black-800"
        />

        <div className="flex gap-x-10 mb-4">
          <select
            placeholder="Responsavel pelo projeto"
            className="text-black-800 col-span-2 w-full"
            onChange={(e: any) => {
              setResponsible(e.target.value);
            }}
          >
            <option value="Responsavel">Responsavel pelo projeto</option>
            <option value="Abraão Isaque">Abraão Isaque</option>
            <option value="Ezequiel Isaque">Ezequiel Isaque</option>
            <option value="Matteus Isaque">Matteus Isaque</option>
          </select>

          <input
            type="text"
            placeholder="Valor"
            onChange={(e) => {
              setValueOfTask(e.target.value);
            }}
            className="col-span-2 w-full text-black-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-10 mb-4">
          <input
            type="date"
            placeholder="Entregar"
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            className="col-span-2 w-full text-black-800"
          />
        </div>

        <button type="submit" className="col-span-2 bg-black-100 w-[20%]">
          Enviar
        </button>
      </form>
    </div>
  );
}
