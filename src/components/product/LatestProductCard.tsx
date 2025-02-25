import {ProductShemaI} from "@/lib/models/productModel";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import Link from "next/link";

const LatestProductCard = ({product, className}: { product: ProductShemaI, className?: string }) => {
  return (
    <div className={`relative w-full  rounded overflow-hidden ${className}`}>
      <Image className='object-cover w-full h-full' fill src={getImageUrl(product.images[0])}
             alt={'img-' + product.name}/>
      <div className='absolute z-[2] inset-0 bg-black/70'/>

      <div className='absolute bottom-[2%] left-[3%] right-[3%] p-2 z-[3] w-[80%]'>
        <Link href={`/products/${product.slug}`} className='text-lg text-gray-300 font-semibold'>{product.name}</Link>
        <p className='text-sm w-[90%] text-gray-300 line-clamp-2'>{product.description}</p>
        <Link href={`/products/${product.slug}`}
              className='text-gray-300 font-semibold underline decoration-redBackground'>Shop Now</Link>
      </div>
    </div>
  )
}
export default LatestProductCard
