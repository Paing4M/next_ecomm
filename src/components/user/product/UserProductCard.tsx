import {ProductSchemaI} from "@/lib/db/models/productModel";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

const UserProductCard = ({product}: { product: ProductSchemaI }) => {
  return (
    <div className={`rounded p-4 group border shadow w-full bg-white`}>
      <Link href={`/products/${product.slug}`} className='block'>
        <Image className='w-full h-full sm:h-[260px] md:[200px] lg:h-[240px] xl:h-[220px] object-fit'
               src={getImageUrl(product.images[0])}
               width={500}
               height={300}
               alt={`${product.name}-image`}/>
      </Link>

      <div className='mt-2 overflow-hidden'>
        <Link href={`/products/${product.slug}`}>
          <h4 className='font-semibold truncate'>{product.name}</h4>
        </Link>
        <p>$ {product.price.toFixed(2)}</p>

        {/*  Product Rating  */}
      </div>
      <button className='w-full bg-black text-center mt-4 py-2 text-white rounded'>Add to cart
      </button>
    </div>
  )
}

export default UserProductCard
