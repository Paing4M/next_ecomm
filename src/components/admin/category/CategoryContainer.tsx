'use client'

import React, {useEffect, useState} from "react";
import ContainerLayout from "@/components/admin/ContainerLayout";
import CategoryTable from "@/components/admin/category/CategoryTable";
import CategoryModal from "@/components/admin/category/CategoryModal";

interface CategoryContainerProps {
  categories: CategoryI[]
}


const CategoryContainer = ({categories}: CategoryContainerProps) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState<CategoryI[]>([])
  const [editCategory, setEditCategory] = useState<CategoryI | null>(null);


  useEffect(() => {
    setFiltered(() => categories?.filter(category => category.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    )
  }, [categories, searchTerm]);

  const openModal = () => setOpen(true)

  const closeModal = () => {
    setOpen(false)
    setEditCategory(null)
  }

  const handleEdit = (category: CategoryI) => {
    setEditCategory(category)
    openModal()
  }


  return (
    <>
      <ContainerLayout>
        <ContainerLayout.Header
          handleSearch={(value: string) => setSearchTerm(value)}
          openModal={openModal}
          buttonText={'Create Category'}/>
        <ContainerLayout.Body>
          <CategoryTable handleEdit={handleEdit} categories={filtered}/>
        </ContainerLayout.Body>
      </ContainerLayout>


      {/* category modal */}
      <CategoryModal category={editCategory} closeModal={closeModal} open={open}/>
    </>
  )
}

export default CategoryContainer
