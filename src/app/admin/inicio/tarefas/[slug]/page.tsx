"use client";
import { db } from "@/util/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

type FindTask = {
  data: {
    value: {
      mapValue: {
        fields: {
          created_at: {
            timestampValue: string;
          };
          description: {
            stringValue: string;
          };
          end_at: {
            timestampValue: string;
          };
          title: {
            stringValue: string;
          };
          value_of_task: {
            stringValue: string;
          };
          uuid: {
            stringValue: string;
          };
          status: {
            booleanValue: boolean;
          };
          responsible: {
            stringValue: string;
          };
        };
      };
    };
  };
  key: {
    path: {
      segments: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
      };
    };
  };
};

export default function Page({ params }: { params: { slug: string } }) {
  const param = params.slug;
  const [data, setData] = useState<FindTask>();
  const idCollection: string | any = data?.key.path.segments[6];
  const [submit, setSubmit] = useState<boolean>();
  const [deleteTask, setDeleteTask] = useState<boolean>(false);

  useEffect(() => {
    const AllItemCollection = async () => {
      const QueryAllItens = query(
        collection(db, "tasks"),
        where("uuid", "==", param)
      );
      const QueryItens: any = await getDocs(QueryAllItens);
      setData(QueryItens._snapshot.docChanges[0].doc);
      setSubmit(
        QueryItens?._snapshot.docChanges[0].doc.data.value.mapValue.fields
          .status.booleanValue
      );
    };
    AllItemCollection();
  }, []);

  async function DeleteTask() {
    const Colection: string | any = data?.key.path.segments[6];

    await deleteDoc(doc(db, "tasks", Colection));

    window.location.href = "/painel";
  }

  async function updateTask() {
    const setTask = doc(db, "tasks", idCollection);
    await updateDoc(setTask, {
      status: submit,
    });

    window.location.reload();
  }

  function FormateDate(item = "00000000000000000000") {
    let convertDate = new Date(item);
    const formateDate = new Intl.DateTimeFormat("pt-BR").format(convertDate);

    return formateDate;
  }

  return (
    <main>
      <div className="ml-[10%] mt-10">
        <Link href="/painel">
          <AiOutlineArrowLeft size={40} />
        </Link>
      </div>
      <div className="max-w-[80%] mx-[10%] mt-20">
        <h1 className="text-3xl">
          {data?.data.value.mapValue.fields.title.stringValue}
        </h1>

        <p>{data?.data.value.mapValue.fields.description.stringValue}</p>
        <p>
          Valor: {data?.data.value.mapValue.fields.value_of_task?.stringValue}
        </p>
        <p>
          Responsavel:{" "}
          {data?.data.value.mapValue.fields.responsible?.stringValue}
        </p>

        <div>
          <div className="flex gap-x-1">
            <p>Entregar:</p>
            <p>
              {FormateDate(
                data?.data.value.mapValue.fields.end_at.timestampValue
              )}
            </p>
          </div>
          <div className="flex gap-x-1">
            <p>Criado em:</p>
            <p>
              {FormateDate(
                data?.data.value.mapValue.fields.created_at.timestampValue
              )}
            </p>
          </div>
          <div className="flex gap-x-1">
            <p>Entregue:</p>
            <div
              className="w-[70px] h-[30px] bg-red-50 relative rounded-2xl cursor-pointer"
              onClick={() => {
                setSubmit(!submit);
              }}
            >
              <div
                id="swith"
                className={`h-[30px] w-[30px] bg-red-500 rounded-3xl absolute transition-all top-0 ${
                  submit === true ? "left-[40px]" : "left-0"
                }`}
              ></div>
            </div>
            <p>{`${data?.data.value.mapValue.fields.status?.booleanValue}`}</p>
          </div>
          <div className="flex gap-x-1">
            <p>Coleção:</p>
            <p>{data?.key.path.segments[6]}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setDeleteTask(!deleteTask);
          }}
          className="bg-white-900 text-black-800 px-20"
        >
          Delete
        </button>
        <button
          onClick={updateTask}
          className="bg-white-900 text-black-800 px-20"
        >
          Update
        </button>

        <div
          className={`fixed h-screen w-screen flex items-center justify-center top-0 left-0 backdrop-blur-sm ${
            deleteTask === true ? "block" : "hidden"
          }`}
        >
          <div className=" h-[300px] w-[600px] bg-gray-500">
            <p>
              Tem certeza que deseja deletar o projeto de titulo "
              {data?.data.value.mapValue.fields.title.stringValue}", ao
              confirmar, não terá como restaurar esse projeto...
            </p>

            <div className={`flex gap-x-10`}>
              <button
                className="bg-red-900 text-white-800 px-10"
                onClick={DeleteTask}
              >
                Deletar
              </button>

              <button
                className="bg-white-900 text-black-800 px-10"
                onClick={() => {
                  setDeleteTask(!deleteTask);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
