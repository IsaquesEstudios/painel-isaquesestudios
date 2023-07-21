"use client";
import { db } from "@/util/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

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

  console.log(data);

  useEffect(() => {
    const AllItemCollection = async () => {
      await getDocs(collection(db, "tasks")).then((res: any) => {
        console.log(res);
        setData(res._snapshot.docChanges);
      });
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
          <div className="flex gap-[40px] w-full" key={index}>
            <p className="text-white-900 w-[20%] ">
              {item.doc.data.value.mapValue.fields.title?.stringValue}
            </p>
            <p className="text-white-900 w-[35%] truncate">
              {item.doc.data.value.mapValue.fields.description?.stringValue}
            </p>
            <p className="text-white-900 w-[20%]">
              {FormateDate(
                item.doc.data.value.mapValue.fields.created_at?.timestampValue
              )}
            </p>
            <p className="text-white-900 w-[20%]">
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
