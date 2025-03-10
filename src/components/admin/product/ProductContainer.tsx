'use client'

import AdminHeader from "@/components/admin/AdminHeader";
import React, {useEffect, useState} from "react";
import ProductModal from "@/components/admin/product/ProductModal";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import AdminProductList from "@/components/admin/product/AdminProductList";
import ContainerLayout from "@/components/admin/ContainerLayout";

interface ProductContainerProps {
  categories: CategoryI[]
  products: ProductSchemaI[]
}

const ProductContainer = ({categories, products}: ProductContainerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProducts, setFilterProducts] = useState<ProductSchemaI[]>(products || [])
  const [editProduct, setEditProduct] = useState<ProductSchemaI | null>(null)

  useEffect(() => {
    setFilterProducts(() => products?.filter(product => product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    )
  }, [products, searchTerm]);

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setEditProduct(null)
    setIsOpen(false)
  }


  const handleEdit = (product: ProductSchemaI) => {
    setEditProduct(product)
    openModal()
  }


  return (
    <>
      <ContainerLayout>
        <ContainerLayout.Header
          handleSearch={(value: string) => setSearchTerm(value)}
          openModal={openModal}
          buttonText={'Create Product'}/>
        <ContainerLayout.Body>
          <AdminProductList handleEdit={handleEdit} products={filterProducts}/>
        </ContainerLayout.Body>
      </ContainerLayout>


      {/* product modal */}
      <ProductModal editProduct={editProduct} open={isOpen} closeModal={closeModal} categories={categories}/>
    </>
  )
}

export default ProductContainer
