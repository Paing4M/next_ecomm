import {ProductShemaI} from "@/lib/models/productModel";
import Link from "next/link";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import React from "react";

const ProductCard = ({product}: { product: ProductShemaI }) => {
  return (
    <div className='w-full overflow-hidden rounded h-auto p-2 group'>
      <Link href={`/products/${product.slug}`}>
        <Image className='h-auto sm:h-[250px] object-fit' src={getImageUrl(product.images[0])}
               width={500}
               height={300}
               alt={`${product.name}-image`}/>
      </Link>

      <div className='mt-2'>
        <Link href={`/products/${product.slug}`}>
          <h4 className='font-semibold'>{product.name}</h4>
        </Link>
        <p>$ {product.price}</p>
        {/*  Product Rating  */}
      </div>
    </div>
  )
}

export default ProductCard
