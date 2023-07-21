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
import { FormEvent, use, useEffect, useState } from "react";

type TaskInfoType = {
  doc: {
    data: {
      value: {
        mapValue: {
          fields: {
            title: {
              stringValue: string;
            };
            description: {
              stringValue: string;
            };
            created_at: {
              timestampValue: string;
            };
            end_at: {
              timestampValue: string;
            };
          };
        };
      };
    };
  };
};

export default function FindAllTask() {
  const [data, setData] = useState<any>();

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

  function FormateDate(item = "00000000000000000000") {
    let convertDate = new Date(item);
    const formateDate = new Intl.DateTimeFormat("pt-BR").format(convertDate);

    return formateDate;
  }

  return (
    <div>
      {data?.map((item: TaskInfoType, index: number) => {
        return (
          <div
            className="flex gap-[40px] w-full mb-2 py-1 px-6 rounded-lg hover:bg-white-900 hover:text-black-800 transition cursor-pointer"
            key={index}
          >
            <p className="w-[20%] truncate">
              {item.doc.data.value.mapValue.fields.title?.stringValue}
            </p>
            <p className="w-full truncate">
              {item.doc.data.value.mapValue.fields.description?.stringValue}
            </p>
            <p className="w-[100px] text-center">
              {FormateDate(
                item.doc.data.value.mapValue.fields.created_at?.timestampValue
              )}
            </p>
            <p className="w-[100px] text-start">
              {FormateDate(
                item.doc.data.value.mapValue.fields.end_at?.timestampValue
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
