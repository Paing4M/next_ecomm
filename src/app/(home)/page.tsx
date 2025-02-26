import {getLatestSale} from "@/lib/actions/saleActions";
import {SaleInterface} from "@/lib/db/models/saleModel";
import SaleBanner from "@/components/home/SaleBanner";
import ProductSlider from "@/components/home/ProductSlider";
import {getLatestProducts, getLimitProducts, getPopularProducts} from "@/lib/actions/productActions";
import Link from "next/link";
import {getAllCategories} from "@/lib/actions/categoryActions";
import {ProductShemaI} from "@/lib/db/models/productModel";
import CategoryList from "@/components/home/CategoryList";
import OurProducts from "@/components/home/OurProducts";
import ProductsLink from "@/components/product/ProductsLink";
import LatestProduct from "@/components/home/LatestProduct";
import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Home',
};

export default async function Home() {
  const sale: SaleInterface | null = await getLatestSale()
  const popularProducts: ProductShemaI[] = await getPopularProducts() || []
  const allCategories: CategoryHomeInterface[] = await getAllCategories() || []
  const limitProducts: ProductShemaI[] = await getLimitProducts() || []
  const latestProducts: ProductShemaI[] = await getLatestProducts() || []


  return (
    <div className='py-3'>
      <SaleBanner sale={sale!}/>

      {/* popular */}
      <div>
        <ProductSlider title={'popular'} productTitle={'Popular Products'} products={popularProducts}/>
      </div>


      <ProductsLink/>

      <hr/>

      {/* categories */}
      <div className='mt-10'>
        <CategoryList categories={allCategories}/>
      </div>
      <hr/>

      {/* products */}
      <div className='mt-10'>
        <OurProducts products={limitProducts}/>
      </div>

      <ProductsLink/>

      <hr/>

      {/* latest */}
      <div className='mt-10'>
        <LatestProduct products={latestProducts}/>
      </div>
    </div>
  );
}
