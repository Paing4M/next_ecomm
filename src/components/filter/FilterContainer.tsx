'use client'

import CategoryFilter from "@/components/filter/CategoryFilter";
import BrandFilter from "@/components/filter/BrandFilter";
import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

interface FilterContainerProps {
  categories: CategoryHomeInterface[]
  brands: string[],
  className?: string,
}

export interface FilterI {
  category?: string[]
  brand?: string[]
}


const FilterContainer = ({categories, brands, className}: FilterContainerProps) => {

  const [filter, setFilter] = useState<FilterI>({})

  const router = useRouter()


  const searchParams = useSearchParams()
  const params = new URLSearchParams()

  const handleFilter = (key: keyof FilterI, value: string) => {
    let copy = {...filter};

    if (!copy[key]) {
      copy[key] = [value];
    } else {
      const currentSectionIdx = copy[key]!.indexOf(value);

      if (currentSectionIdx === -1) {
        copy[key].push(value);
      } else {
        copy[key].splice(currentSectionIdx, 1);
      }
    }

    setFilter(copy);


    Object.entries(copy).forEach(([key, values]) => {
      if (values) values.forEach(value => params.append(key, value));
    });

    router.push(`?${params.toString()}`, {scroll: false});
  };


  const handleResetFilter = () => {
    router.push('/products', {scroll: false});
  }


  useEffect(() => {
    const categories = searchParams.getAll("category");
    const brands = searchParams.getAll("brand");

    setFilter(prev => (
      {
        ...prev,
        brand: brands,
        category: categories
      }
    ))


  }, [searchParams]);

  return (
    <div
      className={`min-w-[230px] border rounded-md p-2 space-y-4 h-fit max-h-[calc(100vh-25px)] overflow-hidden overflow-y-scroll ${className}`}>

      <button onClick={handleResetFilter} className='w-full bg-redBackground text-white py-2 rounded'>Reset Filter
      </button>

      <hr/>

      <CategoryFilter selectedCategory={searchParams.getAll('category')!} handleFilter={handleFilter}
                      categories={categories}/>
      <hr/>

      <BrandFilter selectedBrand={searchParams.getAll('brand')!} handleFilter={handleFilter} brands={brands}/>
      <hr/>
    </div>

  )
}

export default FilterContainer
