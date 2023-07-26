"use client";

import { authContext } from "@/context/authenticate";
import { useContext } from "react";
import ItemAside from "./ItemAside";
import { AiOutlineProfile } from "react-icons/ai";
import SignOut from "./SignOut";
import Image from "next/image";

export default function Aside() {
  const { data } = useContext(authContext);

  console.log(data)

  return (
    <ul className="border-r-[2px] h-full border-black-700 border-solid flex flex-col justify-between">
      <div className="">
        <div className="flex items-end justify-center flex-row h-20">
          <img
            src={data?.photoURL}
            alt="foto de perfil"
            className="rounded-full w-12 h-12 mr-2"
          />
          <div className="flex flex-col">
            <p className="text-sm">{data?.displayName}</p>
            <p className="text-sm">{data?.email}</p>
          </div>
        </div>
        <ItemAside key={1} value="Dashboard" href="/admin/inicio">
          <AiOutlineProfile size={24} />
        </ItemAside>
        <ItemAside key={2} value="Tarefas" href="/admin/tarefas">
          <AiOutlineProfile size={24} />
        </ItemAside>
        <ItemAside key={3} value="Pagamentos" href="/inicio/pagamentos">
          <AiOutlineProfile size={24} />
        </ItemAside>
      </div>

      <div>
        <SignOut />
      </div>
    </ul>
  );
}
