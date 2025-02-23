import {getLatestSale} from "@/lib/actions/saleActions";
import {SaleInterface} from "@/lib/models/saleModel";
import SaleBanner from "@/components/home/SaleBanner";
import ProductSlider from "@/components/home/ProductSlider";
import {getPopularProducts} from "@/lib/actions/productActions";

export default async function Home() {
  const sale: SaleInterface | null = await getLatestSale()
  const popularProducts = await getPopularProducts()

  return (
    <div className='py-3'>
      <SaleBanner sale={sale!}/>

      {/* popular */}
      <ProductSlider title={'popular'} productTitle={'Popular Products'} products={popularProducts}/>

      {/* featured */}
    </div>
  );
}
