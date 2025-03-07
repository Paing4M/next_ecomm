import ProductCard from "@/components/card/ProductCard";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import React from "react";

const UserProductCard = ({product}: { product: ProductSchemaI }) => {
  return (
    <ProductCard product={product}>
      <button className='w-full bg-black text-center mt-4 py-2 text-white rounded'>Add to cart
      </button>
    </ProductCard>
  )
}

export default UserProductCard
