import Title from "@/components/Title";
import React from "react";
import {ProductShemaI} from "@/lib/models/productModel";
import ProductCard from "@/components/product/ProductCard";

const OurProducts = ({products}: { products: ProductShemaI[] }) => {

  if (products.length == 0) return null;

  return (
    <div>

      <Title title={'Our Products'}/>

      <h1 className='text-xl font-bold'>Explore Our Products</h1>

      <div className='mt-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.map(product => (
            <ProductCard product={product} key={product._id}/>
          ))}

        </div>
      </div>


    </div>
  )
}

export default OurProducts
