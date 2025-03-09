'use client'

import AdminHeader from "@/components/admin/AdminHeader";
import React, {useEffect, useState} from "react";
import ProductModal from "@/components/admin/product/ProductModal";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import AdminProductList from "@/components/admin/product/AdminProductList";

interface ProductContainerProps {
  categories: CategoryHomeInterface[]
  products: ProductSchemaI[]
}

const ProductContainer = ({categories, products}: ProductContainerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProducts, setFilterProducts] = useState<ProductSchemaI[]>(products || [])

  useEffect(() => {
    setFilterProducts(() => products?.filter(product => product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    )
  }, [products, searchTerm]);

  const closeModal = () => setIsOpen(false)

  
  return (
    <>
      <div>
        <div className='py-2 gap-2 flex justify-between items-end md:items-center flex-col-reverse md:flex-row'>
          <input
            onChange={e => setSearchTerm(e.target.value)}
            className='py-2 px-4 focus:ring-2 outline-none focus:ring-blue-500 broder rounded w-full shadow max-w-[500px]'
            type="text"
            placeholder='Search ...'/>

          <button onClick={() => setIsOpen(true)}
                  className='bg-blue-500 rounded py-2 px-4 text-white text-center'>Create Product
          </button>

        </div>

        <div className='mt-3'>
          <AdminProductList products={filterProducts}/>
        </div>
      </div>


      {/* product modal */}
      <ProductModal open={isOpen} closeModal={closeModal} categories={categories}/>
    </>
  )
}

export default ProductContainer
