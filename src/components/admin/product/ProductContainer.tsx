'use client'

import AdminHeader from "@/components/admin/AdminHeader";
import {useState} from "react";
import AddProductModal from "@/components/admin/product/AddProductModal";

const ProductContainer = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)


  return (
    <>
      <AdminHeader title={'products'}/>
      <div className='mt-[1rem] px-4'>
        <div className='py-2 px-3 flex justify-end'>
          <button onClick={() => setIsOpen(true)}
                  className='bg-blue-500 rounded py-2 px-4 text-white text-center'>Create Product
          </button>
        </div>

        <div className='mt-3'>

        </div>
      </div>


      {/* product modal */}
      <AddProductModal open={isOpen} closeModal={closeModal}/>
    </>
  )
}

export default ProductContainer
