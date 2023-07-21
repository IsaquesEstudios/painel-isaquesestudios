"use client";
import { db } from "@/util/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

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
          uuid: {
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
  const [data, setData] = useState<FindTask>();

  useEffect(() => {
    const param = params.slug;
    const AllItemCollection = async () => {
      const QueryAllItens = query(
        collection(db, "tasks"),
        where("uuid", "==", param)
      );
      const QueryItens: any = await getDocs(QueryAllItens);

      setData(QueryItens._snapshot.docChanges[0].doc);
    };
    AllItemCollection();
  }, []);

  async function DeleteTask() {
    const Colection:string | any = data?.key.path.segments[6]

    await deleteDoc(doc(db, "tasks", Colection));

    window.location.href="/painel"
  }

  function FormateDate(item = "00000000000000000000") {
    let convertDate = new Date(item);
    const formateDate = new Intl.DateTimeFormat("pt-BR").format(convertDate);

    return formateDate;
  }

  return (
    <main>
      <div className="max-w-[80%] mx-[10%] mt-20">
        <h1 className="text-3xl">
          {data?.data.value.mapValue.fields.title.stringValue}
        </h1>

        <p>{data?.data.value.mapValue.fields.description.stringValue}</p>

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
            <p>Coleção:</p>
            <p>{data?.key.path.segments[6]}</p>
          </div>
        </div>

        <button onClick={DeleteTask} className="bg-white-900 text-black-800 px-20">Delete</button>
      </div>
    </main>
  );
}
