import React from "react";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

interface AdminProductCardProps {
  product: ProductSchemaI
  handleEdit?: (product: ProductSchemaI) => void
}


const AdminProductCard = ({product, handleEdit}: AdminProductCardProps) => {
  return (
    <div className={`rounded p-4 group border shadow w-full bg-white`}>
      <Image className='w-full h-auto sm:h-[260px] md:[200px] lg:h-[240px] xl:h-[220px] object-fit'
             src={getImageUrl(product.images[0])}
             width={500}
             height={300}
             alt={`${product.name}-image`}/>


      <div className='mt-2 overflow-hidden'>
        <h4 className='font-semibold truncate'>{product.name}</h4>
        <p>$ {product.price.toFixed(2)}</p>
      </div>
      <div className='flex items-center gap-x-2 justify-between mt-3'>
        <button className='px-3 py-1 bg-redBackground min-w-[100px] text-center rounded text-white'>Delete</button>
        <button onClick={() => handleEdit ? handleEdit(product) : undefined}
                className='px-3 py-1 bg-green-400 min-w-[100px] text-center rounded text-white'>Edit
        </button>
      </div>
    </div>

  )
}

export default AdminProductCard

