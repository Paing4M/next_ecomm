import SuccessPurchase from "@/components/user/SuccessPurchase";

type SearchParams = Promise<{ session_id?: string | null }>;

const PurchaseSuccessPage = async ({
                                     searchParams,
                                   }: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams;
  const sessionId = params.session_id ?? null;

  return (
    <section className="flex items-center justify-center h-[calc(100vh-70px)]">
      <SuccessPurchase sessionId={sessionId}/>
    </section>
  );
};

export default PurchaseSuccessPage;
