import SuccessPurchase from "@/components/user/SuccessPurchase";
import {Suspense} from "react";


const PurchaseSuccessPage = async () => {


  return (
    <section className="flex items-center justify-center h-[calc(100vh-70px)]">
      <Suspense fallback={<p className="text-center p-8">Loading...</p>}>
        <SuccessPurchase/>
      </Suspense>
    </section>
  )
}

export default PurchaseSuccessPage
