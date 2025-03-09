'use client'

import CategoryFilter from "@/components/user/filter/CategoryFilter";
import BrandFilter from "@/components/user/filter/BrandFilter";
import React from "react";
import {FilterI} from "@/components/user/product/Container";

interface FilterContainerProps {
  categories: CategoryHomeInterface[]
  brands: string[],
  filter: FilterI
  className?: string,
  handleResetFilter: () => void,
  handleFilter: (key: keyof FilterI, value: string) => void
}


const FilterContainer = ({
                           categories,
                           brands,
                           className,
                           handleResetFilter,
                           handleFilter,
                           filter
                         }: FilterContainerProps) => {


  return (
    <div
      className={`min-w-[230px] border rounded-md p-2 space-y-4 h-fit max-h-[calc(100vh-90px)] overflow-hidden overflow-y-scroll ${className}`}>

      <button onClick={handleResetFilter} className='w-full bg-redBackground text-white py-2 rounded'>Reset Filter
      </button>

      <hr/>

      <CategoryFilter selectedCategory={filter.category || []} handleFilter={handleFilter}
                      categories={categories}/>
      <hr/>

      <BrandFilter selectedBrand={filter.brand || []} handleFilter={handleFilter}
                   brands={brands}/>

    </div>

  )
}

export default FilterContainer
