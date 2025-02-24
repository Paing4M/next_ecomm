import {getLatestSale} from "@/lib/actions/saleActions";
import {SaleInterface} from "@/lib/models/saleModel";
import SaleBanner from "@/components/home/SaleBanner";
import ProductSlider from "@/components/home/ProductSlider";
import {getPopularProducts} from "@/lib/actions/productActions";
import Link from "next/link";
import {getAllCategories} from "@/lib/actions/categoryActions";
import {ProductShemaI} from "@/lib/models/productModel";
import CategoryList from "@/components/home/CategoryList";

export default async function Home() {
  const sale: SaleInterface | null = await getLatestSale()
  const popularProducts: ProductShemaI[] = await getPopularProducts() || []
  const allCategories: CategoryHomeInterface[] = await getAllCategories() || []

  console.log(allCategories)


  return (
    <div className='py-3'>
      <SaleBanner sale={sale!}/>

      {/* popular */}
      <div>
        <ProductSlider title={'popular'} productTitle={'Popular Products'} products={popularProducts}/>
      </div>


      <div className='mt-2 mb-6 flex items-center justify-center'>
        <Link href={'/products'} className='px-3 py-2 rounded text-white bg-redBackground'>View all products</Link>
      </div>

      <hr/>

      {/* categories */}
      <div className='mt-10'>
        <CategoryList categories={allCategories}/>
      </div>
      <hr/>

      {/* products */}
      <div className='mt-10'>
        
      </div>

      {/* latest */}
      <div>

      </div>
    </div>
  );
}
