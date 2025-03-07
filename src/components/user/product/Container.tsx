'use client'

import FilterContainer from "@/components/user/filter/FilterContainer";
import UserProductList from "@/components/user/product/UserProductList";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import {FilterIcon, XIcon} from "lucide-react";
import {useEffect, useState} from "react";
import TagFilter from "@/components/user/filter/TagFilter";
import {useRouter, useSearchParams} from "next/navigation";

interface ContainerProps {
  categories?: CategoryHomeInterface[];
  brands?: string[];
  products?: ProductSchemaI[];
  tags?: string[];
}

export interface FilterI {
  category?: string[]
  brand?: string[]
  tag?: string[]
}


const Container = ({categories, brands, products, tags}: ContainerProps) => {

  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<FilterI>({})

  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilter = (key: keyof FilterI, value: string) => {
    let copy = {...filter};
    console.log(key, value)
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
  };


  const handleResetFilter = () => {
    router.push('/products', {scroll: false});
  }

  console.log(filter)


  useEffect(() => {
    const categories = searchParams.get("category")?.split(',') || [];
    const brands = searchParams.get('brand')?.split(',') || [];
    const tags = searchParams.get('tag')?.split(',') || [];

    setFilter(prev => (
      {
        ...prev,
        brand: brands,
        category: categories,
        tag: tags
      }
    ))

  }, [searchParams]);


  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    Object.entries(filter).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    });

    router.push(`/products?${params.toString()}`, {scroll: false});
  }, [filter]);

  return (
    <>
      <div className='flex gap-x-6'>
        <FilterContainer
          className={`hidden md:block`}
          handleResetFilter={handleResetFilter}
          handleFilter={handleFilter}
          categories={categories!}
          brands={brands!}
          filter={filter}
        />


        <div className=' w-full overflow-x-hidden'>
          <div className='flex items-center justify-between'>

            <div>
              {products && products.length > 0 && (
                <p className='text-sm text-gray-600'>showing ({products.length})
                  result{products.length === 1 ? '' : 's'}</p>
              )}
            </div>


            <div className='flex items-center gap-x-3 relative'>
              <FilterIcon onClick={() => setIsOpen(prev => !prev)}
                          className='text-sm text-gray-600 cursor-pointer '/>
            </div>


          </div>

          <hr className='mb-4 mt-3'/>

          <TagFilter selectedTags={filter.tag || []} tags={tags!} handleFilter={handleFilter}/>

          <UserProductList products={products!}/>

        </div>
      </div>

      {/* mobile filter */}
      {isOpen && (
        <div className='fixed border px-2 z-[15] top-0 w-fit right-0 bottom-0 bg-white md:hidden '>

          <XIcon onClick={() => setIsOpen(false)} className='absolute cursor-pointer top-3 right-3'/>

          <FilterContainer
            filter={filter}
            className={`border-none h-full shadow-none bg-white mt-[4rem]`}
            handleResetFilter={handleResetFilter}
            handleFilter={handleFilter}
            categories={categories!}
            brands={brands!}/>
        </div>

      )}
    </>
  )
}

export default Container
