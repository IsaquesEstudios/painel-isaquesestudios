"use client";

import { AllPayments } from "@/components/Paymount/AllPayments";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>carregando</p>}>
        <AllPayments />
      </Suspense>
    </div>
  );
}
