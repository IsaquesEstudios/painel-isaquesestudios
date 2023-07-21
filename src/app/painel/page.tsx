// "use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/util/firebase";
import CreateTask from "@/components/CreateTask";
import { useEffect, useState } from "react";
import FindAllTask from "@/components/FindAllTask";

export default async function Index() {
  // const [tasks, setTasks] = useState<any>();


  // console.log(AllItemCollection.docs[0]._document.data.value.mapValue.fields);

  return (
    <main>
      <CreateTask />
      <div className="mx-[10%] mt-10 bg-black-600 w-[80%] h-[1px] "></div>
      <div className="mx-[10%] mt-10 w-[80%]">
        {/* {tasks.map((item: any, index: number) => {
          console.log(item);
          return (
            <div key={index}>
              <div>{item._document.data.value.mapValue.fields}</div>
            </div>
          );
        })} */}

        <FindAllTask />
      </div>
    </main>
  );
}
