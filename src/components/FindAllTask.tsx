"use client";
import { db } from "@/util/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { FormEvent, use, useEffect, useState } from "react";

type TaskInfoType = {
  doc: {
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
            responsible: {
              stringValue: string;
            };
          };
        };
      };
    };
    key: {
      path: {
        segments: any;
      };
    };
  };
};

export default function FindAllTask() {
  const [data, setData] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(false)
  const [filter, setFilter] = useState<boolean>(false);

  useEffect(() => {
    const AllItemCollection = async () => {
      const QueryAllItens = query(
        collection(db, "tasks"),
        orderBy("created_at", "desc"),
        limit(14)
      );
      const QueryItens: any = await getDocs(QueryAllItens);

      setData(QueryItens._snapshot.docChanges);
    };
    AllItemCollection();
  }, []);


  // useEffect(() => {

  function handleFilter(user:string){

    console.log(user)
    const AllItemCollection = async () => {
      const QueryAllItens = query(
        collection(db, "tasks"),
        where("responsible", "==", user),
        // orderBy("created_at", "desc"),
        // limit(14)
      );
      const QueryItens: any = await getDocs(QueryAllItens);

      setData(QueryItens._snapshot.docChanges);
    };
    AllItemCollection();

  }
  // }, [refresh]);

  function FormateDate(item = "00000000000000000000") {
    let convertDate = new Date(item);
    const formateDate = new Intl.DateTimeFormat("pt-BR").format(convertDate);

    return formateDate;
  }

  return (
    <div>
      <div className="flex px-6 gap-[40px]">
        <div className="w-[500px]">Titulo</div>
        <div
          className="w-[300px] relative cursor-pointer"
          onClick={() => {
            setFilter(!filter);
          }}
        >
          Responsavel
          <div className={`fixed w-[500px] bg-black-800 border-[1px] border-e-red-50 flex flex-col ${filter === true ? "block" : "hidden"}`}>
            <p className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer" onClick={(e:any)=>{handleFilter(e.target.innerText)}}>
              Abraão Isaque
            </p>
            <p className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer" onClick={(e:any)=>{handleFilter(e.target.innerText)}}>
              Ezequiel Isaque
            </p>
            <p className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer" onClick={(e:any)=>{handleFilter(e.target.innerText)}}>
              Matteus Isaque
            </p>
          </div>
        </div>
        <div className="w-full">Descrição</div>
        <div className="w-[145px]">Criado</div>
        <div className="w-[160px]">Entregar</div>
      </div>
      {data?.map((item: TaskInfoType, index: number) => {
        return (
          <Link
            href={`/painel/tarefas/${item.doc.data.value.mapValue.fields.uuid.stringValue}`}
            className="w-full"
            key={index}
          >
            <div className="flex gap-[40px] w-full mb-2 py-1 px-6 rounded-lg hover:bg-white-900 hover:text-black-800 transition cursor-pointer">
              <p className="w-[500px] truncate">
                {item.doc.data.value.mapValue.fields.title?.stringValue}
              </p>
              <p className="w-[300px] truncate">
                {item.doc.data.value.mapValue.fields.responsible?.stringValue}
              </p>
              <p className="w-full truncate">
                {item.doc.data.value.mapValue.fields.description?.stringValue}
              </p>
              <p className="w-[70px] text-center">
                {FormateDate(
                  item.doc.data.value.mapValue.fields.created_at?.timestampValue
                )}
              </p>
              <p className="w-[70px] text-start">
                {FormateDate(
                  item.doc.data.value.mapValue.fields.end_at?.timestampValue
                )}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
