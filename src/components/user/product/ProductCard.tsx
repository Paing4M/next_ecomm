import {ProductShemaI} from "@/lib/db/models/productModel";
import Link from "next/link";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

const ProductCard = ({product, widthPercent}: { product: ProductShemaI, widthPercent?: string }) => {
  return (
    <div style={{
      width: widthPercent || '100%',
    }} className={`rounded p-4 group border shadow`}>
      <Link href={`/src/app/(user)/products/${product.slug}`} className='block'>
        <Image className='w-full h-full sm:h-[260px] md:[200px] lg:h-[240px] object-fit'
               src={getImageUrl(product.images[0])}
               width={500}
               height={300}
               alt={`${product.name}-image`}/>
      </Link>

      <div className='mt-2 overflow-hidden'>
        <Link href={`/src/app/(user)/products/${product.slug}`}>
          <h4 className='font-semibold truncate'>{product.name}</h4>
        </Link>
        <p>$ {product.price.toFixed(2)}</p>

        {/*  Product Rating  */}

        <button className='w-full bg-black text-center mt-4 py-2 text-white rounded'>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductCard
