'use client'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ProductShemaI} from "@/lib/models/productModel";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import React from "react";
import {ArrowLeft, ArrowRight} from "lucide-react";
import Link from "next/link";


interface SliderArrowProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: any
}

const SliderArrow = ({className, style, children, onClick}: SliderArrowProps) => {
  return (
    <button onClick={onClick}
            className={`absolute top-[-14%] z-[5] p-1 rounded bg-gray-200  ${className} `}
            style={{...style}}>
      {children}
    </button>
  )
}

const Prev = ({onClick}: { onClick?: any }) => {
  return (
    <SliderArrow onClick={onClick} className=' right-[4rem]'>
      <ArrowLeft/>
    </SliderArrow>
  )
}

const Next = ({onClick}: { onClick?: any }) => {
  return (
    <SliderArrow onClick={onClick} className='right-[1rem]'>
      <ArrowRight/>
    </SliderArrow>
  )
}


interface ProductSliderProps {
  products: ProductShemaI[];
  title: string;
  productTitle: string;
}

const ProductSlider = ({products, productTitle, title}: ProductSliderProps) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <Prev/>,
    nextArrow: <Next/>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  console.log(products);


  if (products.length == 0) return

  return (
    <div className='w-full h-auto mt-10'>
      <div className='flex gap-3 items-center mb-4'>
        <div className='w-[10px] rounded h-[24px] bg-redBackground'/>
        <p className='text-sm text-redBackground'>
          {title}
        </p>
      </div>

      <div>

        <h1 className='text-xl font-bold'>{productTitle}</h1>

        <Slider className='mt-5' {...settings}>
          {products?.map((product) => (
            <div key={product._id} className='w-full overflow-hidden rounded h-auto p-2 group'>
              <div className='relative'></div>
              <Link href={`/product/${product.slug}`}>
                <Image className='h-auto sm:h-[250px] object-fit' src={getImageUrl(product.images[0])}
                       width={500}
                       height={300}
                       alt={`${product.name}-image`}/>
              </Link>

              <div className='mt-2'>
                <Link href={`/product/${product.slug}`}>
                  <h4 className='font-semibold'>{product.name}</h4>
                </Link>
                <p>$ {product.price}</p>
                {/*  Product Rating  */}
              </div>
            </div>

          ))}
        </Slider>
      </div>

      <div className='sm:p-2 md:p-2 lg:p-2'></div>
    </div>
  )
}


export default ProductSlider