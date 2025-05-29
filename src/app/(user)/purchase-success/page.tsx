'use client'

import SuccessPurchase from "@/components/user/SuccessPurchase";
import {Suspense} from "react";


const PurchaseSuccessPage = async () => {


  return (
    <section className="flex items-center justify-center h-[calc(100vh-70px)]">
      <Suspense>
        <SuccessPurchase/>
      </Suspense>
    </section>
  )
}

export default PurchaseSuccessPage
