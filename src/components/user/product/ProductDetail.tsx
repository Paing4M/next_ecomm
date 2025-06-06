'use client'

import {ProductSchemaI} from "@/lib/db/models/productModel";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import React, {useEffect, useState} from "react";
import {Minus, Plus} from "lucide-react";
import ProductReviewContainer from "@/components/user/product/ProductReviewContainer";
import Rating from "@/components/Rating";
import useCartStore, {CartProductI} from "@/hooks/useCartStore";

const ProductDetail = ({product}: { product: ProductSchemaI }) => {
  const [idx, setIdx] = useState(0);
  const [img, setImg] = useState('');
  const [quantity, setQuantity] = useState(1)
  const {addToCart} = useCartStore()

  useEffect(() => {
    setImg(product.images[idx]);
  }, [idx])

  const handleImageIdx = (idx: number) => {
    setIdx(idx);
  }

  const increment = () => {
    if (quantity < product.countInStock) {
      setQuantity(prev => prev + 1);
    }
  }

  const decrement = () => {
    if (quantity !== 1) {
      setQuantity(prev => prev - 1);
    }
  }


  return (
    <div>
      <div className='flex gap-x-6 mt-4 flex-col md:flex-row'>
        <div className='flex-1 flex gap-x-6 gap-y-4 flex-col-reverse md:flex-row mx-auto'>
          <div className='flex w-fit flex-row md:flex-col gap-4  flex-wrap md:flex-nowrap'>
            {/* images */}
            {product.images?.map((img, idx) => (
              <div onClick={() => handleImageIdx(idx)} onMouseEnter={() => handleImageIdx(idx)}
                   key={product._id + '-' + img}
                   className='cursor-pointer w-fit p-4  relative border rounded-md'>
                <Image width={80} height={80} className='object-contain' src={getImageUrl(img)}
                       alt={'img-' + product.name} unoptimized/>
              </div>
            ))}

          </div>

          {/* preview image */}
          <div
            className='w-full max-w-[500px] h-[400px] md:h-[430px] lg:h-[510px] border p-4 shadow-lg rounded-lg'>
            <Image src={getImageUrl(img)} alt={`main-img`} width={100} height={100}
                   className='object-contain w-full h-full'/>
          </div>
        </div>


        {/* detail */}
        <div className='flex-1 ml-0 md:ml-6 mt-6 space-y-2 md:mt-0'>
          <h1 className='text-xl font-bold flex-[2]'>{product.name}</h1>

          <h1 className='text-2xl text-gray-600'>${product.price.toFixed(2)}</h1>

          {/* rating */}
          <Rating value={product.rating}/>

          <p className='text-gray-600 my-3'>
            {product.description}
          </p>

          <hr/>

          <div className='mt-3 flex gap-3 items-center'>

            <div className='flex border rounded w-fit items-center overflow-hidden'>
              <button onClick={decrement} disabled={quantity === 1}
                      className={`text-lg rounded-r  p-2 ${quantity === 1 ? 'text-gray-400' : 'hover:bg-redBackground hover:text-white'}`}>
                <Minus/>
              </button>

              <div className='min-w-[50px] text-center mx-2 text-lg'>{quantity}</div>

              <button disabled={quantity === product.countInStock} onClick={increment}
                      className={`text-lg rounded-l  p-2 ${quantity === product.countInStock ? 'text-gray-400' : 'hover:bg-redBackground hover:text-white'}`}>
                <Plus/>
              </button>
            </div>

            <div onClick={() => addToCart(product as CartProductI, quantity)}
                 className='bg-black px-3 py-2 cursor-pointer text-white rounded min-w-[150px] text-center'>
              Add to cart
            </div>

          </div>

        </div>
      </div>


      <hr className='my-8'/>

      <ProductReviewContainer productId={product._id}/>

    </div>
  )
}

export default ProductDetail
