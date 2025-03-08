'use client'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import React from "react";
import {ArrowLeft, ArrowRight} from "lucide-react";
import Link from "next/link";
import Title from "@/components/user/Title";
import ProductCard from "@/components/card/ProductCard";
import UserProductCard from "@/components/user/product/UserProductCard";


export interface SliderArrowProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: any
}

export const SliderArrow = ({className, style, children, onClick}: SliderArrowProps) => {
  return (
    <button onClick={onClick}
            className={`absolute z-[5] p-1 rounded bg-gray-100  ${className} `}
            style={{...style}}>
      {children}
    </button>
  )
}

const Prev = ({onClick}: { onClick?: any }) => {
  return (
    <SliderArrow onClick={onClick}
                 className='left-0 sm:left-auto w-fit right-0 sm:right-[2.5rem] sm:top-[-11%] top-[50%] translate-y-[-50%] '>
      <ArrowLeft/>
    </SliderArrow>
  )
}

const Next = ({onClick}: { onClick?: any }) => {
  return (
    <SliderArrow onClick={onClick}
                 className='right-0 w-fit sm:top-[-11%] top-[50%] translate-y-[-50%] '>
      <ArrowRight/>
    </SliderArrow>
  )
}


interface ProductSliderProps {
  products: ProductSchemaI[];
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
        breakpoint: 1124,
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

  if (products.length == 0) return

  return (
    <div className='w-full h-auto mt-10'>
      <Title title={title}/>

      <div>

        <h1 className='text-xl font-bold'>{productTitle}</h1>

        <Slider className='mt-5 flex gap-3' {...settings}>
          {products?.map((product) => (
            <div key={product._id} className='px-2'>
              <UserProductCard product={product}/>
            </div>
          ))}
        </Slider>
      </div>

    </div>
  )
}


export default ProductSlider