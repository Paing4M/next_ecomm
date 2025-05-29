import SuccessPurchase from "@/components/user/SuccessPurchase";


type SearchParams = { session_id: string | undefined | null }

const PurchaseSuccessPage = async ({searchParams}: { searchParams: SearchParams }) => {
  const res = await searchParams

  return (
    <section className="flex items-center justify-center h-[calc(100vh-70px)]">
      <SuccessPurchase sessionId={res?.session_id!}/>
    </section>
  )
}

export default PurchaseSuccessPage
