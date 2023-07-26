"use client";
import { authContext } from "@/context/authenticate";
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
import { FormEvent, use, useEffect, useState, useContext } from "react";

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
            status: {
              booleanValue: boolean;
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

  const [filterUser, setFilterUser] = useState<string>("");
  const [filterUserPopUp, setFilterUserPopUp] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<boolean | null>(null);
  const [filterStatePopUp, setFilterStatePopUp] = useState<boolean | null>(
    null
  );

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

  const {isAdmin} = useContext(authContext)

  function handleFilterUser(user: string) {
    setFilterUser(user);
    const AllItemCollection = async () => {
      const QueryAllItens = query(
        collection(db, "tasks"),
        where("responsible", "==", user)
        // where("status", "!=", filterState)
      );
      const QueryItens: any = await getDocs(QueryAllItens);

      setData(QueryItens._snapshot.docChanges);
    };
    AllItemCollection();
  }

  function handleFilterState(filter: boolean | null) {
    const AllItemCollection = async () => {
      const QueryAllItens = query(
        collection(db, "tasks"),
        // where("responsible", "==", user),
        where("status", "!=", filter)
      );
      const QueryItens: any = await getDocs(QueryAllItens);

      setData(QueryItens._snapshot.docChanges);
    };
    AllItemCollection();
  }

  function FormateDate(item = "00000000000000000000") {
    let convertDate = new Date(item);
    const formateDate = new Intl.DateTimeFormat("pt-BR").format(convertDate);

    return formateDate;
  }

  if(isAdmin){
    return(
        <div>
          <div className="flex px-6 gap-[20px]">
          <div className="w-[400px]">Titulo</div>
          <div
            className="w-[200px] relative cursor-pointer"
            onClick={() => {
              setFilterUserPopUp(!filterUserPopUp);
            }}
          >
            Responsavel
            <div
              className={`fixed w-[500px] bg-black-800 border-[1px] border-e-red-50 flex flex-col ${
                filterUserPopUp === true ? "block" : "hidden"
              }`}
            >
              <p
                className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer"
                onClick={(e: any) => {
                  handleFilterUser(e.target.innerText);
                }}
              >
                Todos
              </p>
              <p
                className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer"
                onClick={(e: any) => {
                  handleFilterUser(e.target.innerText);
                }}
              >
                Abraão Isaque
              </p>
              <p
                className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer"
                onClick={(e: any) => {
                  handleFilterUser(e.target.innerText);
                }}
              >
                Ezequiel Isaque
              </p>
              <p
                className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer"
                onClick={(e: any) => {
                  handleFilterUser(e.target.innerText);
                }}
              >
                Matteus Isaque
              </p>
            </div>
          </div>
          <div
            className="w-[80px] relative cursor-pointer"
            onClick={() => {
              setFilterStatePopUp(!filterStatePopUp);
            }}
          >
            Status
            <div
              className={`fixed w-[500px] bg-black-800 border-[1px] border-e-red-50 flex flex-col ${
                filterStatePopUp === true ? "block" : "hidden"
              }`}
            >
              <p
                className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer"
                onClick={(e: any) => {
                  handleFilterState(null);
                }}
              >
                Todos
              </p>
              <p
                className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer"
                onClick={(e: any) => {
                  handleFilterState(false);
                }}
              >
                Terminado
              </p>
              <p
                className="py-2 pl-2 hover:bg-yellow-600 cursor-pointer"
                onClick={(e: any) => {
                  handleFilterState(true);
                }}
              >
                Pendente
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
              href={`/admin/tarefas/${item.doc.data.value.mapValue.fields.uuid?.stringValue}`}
              className="w-full"
              key={index}
            >
              <div className="flex gap-[40px] w-full mb-2 py-1 px-6 rounded-lg hover:bg-white-900 hover:text-black-800 transition cursor-pointer">
                <p className="w-[430px] truncate">
                  {item.doc.data.value.mapValue.fields.title?.stringValue}
                </p>
                <p className="w-[200px] truncate">
                  {item.doc.data.value.mapValue.fields.responsible?.stringValue}
                </p>
                <div
                  className={`w-[100px] flex items-center justify-center ${
                    item.doc.data.value.mapValue.fields.status?.booleanValue ===
                    true
                      ? "bg-green-700"
                      : "bg-red-600"
                  }`}
                >
                  <p>{`${item.doc.data.value.mapValue.fields.status?.booleanValue}`}</p>
                </div>
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
    )
  } else {
    return(
      <p>Não permitido</p>
    )
  }
}
