"use client";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

type ItemAsideType = {
  value: string;
  href?: string | any;
  children: ReactNode;
};

export default function ItemAside({
  value,
  href,
  children,
  ...rest
}: ItemAsideType) {
  return (
    <li {...rest}>
      <Link
        href={href}
        className={`flex gap-1 text-xl items-center justify-center py-6 hover:bg-yellow-800 hover:text-black-800`}
      >
        {children} {value}
      </Link>
    </li>
  );
}
