import {ProductShemaI} from "@/lib/db/models/productModel";
import Title from "@/components/Title";
import React from "react";
import LatestProductCard from "@/components/product/LatestProductCard";

const LatestProduct = ({products}: { products: ProductShemaI[] }) => {

  if (products.length == 0) return null;

  return (
    <div className='mb-14'>

      <Title title={'Featured'}/>

      <h1 className='text-xl font-bold'>Latest Products</h1>

      <div className='mt-5'>

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sm:grid-rows-2 min-h-[400px] h-auto'>

          <LatestProductCard className='h-[300px] sm:h-full sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-2'
                             product={products[0]}/>

          <LatestProductCard className='h-[300px] sm:h-full sm:col-span-1 sm:row-span-1 md:col-span-2 md:row-span-1'
                             product={products[1]}/>

          <LatestProductCard className='h-[300px] sm:h-full' product={products[2]}/>

          <LatestProductCard className='h-[300px] sm:h-full' product={products[3]}/>

        </div>

      </div>
    </div>
  )
}
export default LatestProduct
