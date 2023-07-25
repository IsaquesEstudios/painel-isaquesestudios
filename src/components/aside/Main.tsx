"use client";

import { authContext } from "@/context/authenticate";
import { useContext } from "react";
import ItemAside from "./ItemAside";
import { AiOutlineProfile } from "react-icons/ai";
import SignOut from "./SignOut";

export default function Aside() {
  const { data } = useContext(authContext);

  return (
    <ul className="border-r-[2px] h-full border-black-700 border-solid flex flex-col justify-between">
      <div>
        <ItemAside key={1} value="Dashboard" href="/inicio">
          <AiOutlineProfile size={24} />
        </ItemAside>
        <ItemAside key={2} value="Tarefas" href="/inicio/tarefas/nova">
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
