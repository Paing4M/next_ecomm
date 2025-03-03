'use client'

import FilterContainer from "@/components/filter/FilterContainer";
import ProductList from "@/components/product/ProductList";
import {ProductShemaI} from "@/lib/db/models/productModel";
import {FilterIcon, LucideSortDesc, XIcon} from "lucide-react";
import {useState} from "react";

interface ContainerProps {
  categories?: CategoryHomeInterface[];
  brands?: string[];
  products?: ProductShemaI[];
}

const Container = ({categories, brands, products}: ContainerProps) => {

  const [isOpen, setIsOpen] = useState(false)


  return (
    <>
      <div className='flex gap-x-6'>
        <FilterContainer className={`hidden md:block`}
                         categories={categories!}
                         brands={brands!}/>

        <div className=' w-full'>
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

          <ProductList products={products!}/>

        </div>
      </div>

      {/* mobile filter */}
      {isOpen && (
        <div className='fixed border px-2 z-[15] top-0 w-fit right-0 bottom-0 bg-white md:hidden '>

          <XIcon onClick={() => setIsOpen(false)} className='absolute cursor-pointer top-3 right-3'/>

          <FilterContainer className={`border-none h-full shadow-none bg-white mt-[4rem]`} categories={categories!}
                           brands={brands!}/>
        </div>

      )}
    </>
  )
}

export default Container
