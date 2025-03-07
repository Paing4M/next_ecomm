import {ProductSchemaI} from "@/lib/db/models/productModel";
import ProductCardBody from "@/components/card/ProductCardBody";
import React from "react";

interface ProductCardProps {
  product: ProductSchemaI,
  widthPercent?: string,
  children: React.ReactNode,
}

const ProductCard = ({product, widthPercent, children}: ProductCardProps) => {
  return (
    <div style={{
      width: widthPercent || '100%',
    }} className={`rounded p-4 group border shadow`}>
      <ProductCardBody product={product}/>
      {children}
    </div>

  )
}

export default ProductCard
