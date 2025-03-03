'use client'

import {ProductShemaI} from "@/lib/db/models/productModel";
import ProductCard from "@/components/user/product/ProductCard";

interface ProductListProps {
  products: ProductShemaI[]
}

const ProductList = ({products}: ProductListProps) => {


  if (products.length === 0) return <p className='text-redBackground text-center w-full p-2'>No product found.</p>

  return (

    <div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {products.map((product) => (
        <ProductCard key={product._id} product={product}/>
      ))}
    </div>

  )
}

export default ProductList
