'use client'

import React, {ChangeEvent, useState} from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {FilterI} from "@/components/user/product/Container";

interface TagFilterProps {
  tags: string[];
  handleFilter: (key: keyof FilterI, value: string) => void;
  selectedTags: string[];
}


const TagFilter = ({tags, handleFilter, selectedTags}: TagFilterProps) => {

  if (tags && tags.length === 0) return null;

  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
  }


  return (
    <div className='w-full mb-5'>

      <h4 className='text-gray-600 text-sm mb-1'>Filter By Tag</h4>

      <Slider {...settings} className='relative'>
        {tags.map((tag) => (
          <div key={tag} className='text-wrap px-2'>
            <span
              onClick={() => handleFilter("tag", tag)}
              className={`py-1 px-3 border rounded w-full inline-block cursor-pointer text-center ${selectedTags.includes(tag) ? 'text-white bg-redBackground' : ''}`}>
              {tag}
            </span>
          </div>
        ))}


      </Slider>
    </div>
  )
}

export default TagFilter
