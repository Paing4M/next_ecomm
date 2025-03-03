'use client'

import Title from "@/components/user/Title";
import Slider from "react-slick";
import Link from "next/link";
import React from "react";
import {ArrowLeft, ArrowRight} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {SliderArrow} from "@/components/user/home/ProductSlider";


interface ArrowProps {
  style?: React.CSSProperties,
  className?: string,
  onClick?: any
}

export const Prev = ({onClick}: { onClick?: any }) => {

  return (
    <SliderArrow onClick={onClick} className=' hidden sm:block top-[-2rem] right-[2.5rem]'>
      <ArrowLeft/>
    </SliderArrow>
  )
}

export const Next = ({onClick}: { onClick?: any }) => {

  return (
    <SliderArrow onClick={onClick} className='hidden sm:block right-0 top-[-2rem]'>
      <ArrowRight/>
    </SliderArrow>
  )
}


const CategoryList = ({categories}: { categories: CategoryHomeInterface[] }) => {

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: <Prev/>,
    nextArrow: <Next/>,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        }
      },
      {
        breakpoint: 1045,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        }
      },

      {
        breakpoint: 910,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 410,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 270,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  }

  if (categories.length == 0) return null

  return (
    <div>
      <Title title='Categories'/>

      <h1 className='text-xl font-bold'>Browse By Category</h1>

      <div className='mb-4'>
        <Slider {...settings} className='relative'>
          {categories.map((category) => (
            <div key={category._id} className='py-3 text-wrap px-2'>
              <Link href={encodeURI('/products?category=' + category.slug)}
                    className='py-2 px-4 border rounded hover:bg-redBackground hover:text-white w-full block text-center'>
                {category.name}
              </Link>
            </div>
          ))}


        </Slider>
      </div>


    </div>
  )
}

export default CategoryList
