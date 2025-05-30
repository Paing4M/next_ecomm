'use client'

import React, {useEffect, useState} from "react";
import ContainerLayout from "@/components/admin/ContainerLayout";
import CategoryTable from "@/components/admin/category/CategoryTable";
import CategoryModal from "@/components/admin/category/CategoryModal";
import {deleteCategory} from "@/lib/actions/categoryActions";
import {toast} from "react-toastify";

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

  const handleDelete = async (id: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this category?")) {
        const res = await deleteCategory(id)
        // console.log(res)
        if (res?.success) {
          toast.success("Category Deleted")
        }
      }

    } catch (e: any) {
      console.log('Error in deleting category ', e)

    }
  }

  return (
    <>
      <ContainerLayout>
        <ContainerLayout.Header
          handleSearch={(value: string) => setSearchTerm(value)}
          openModal={openModal}
          buttonText={'Create Category'}/>
        <ContainerLayout.Body>
          <CategoryTable handleDelete={handleDelete} handleEdit={handleEdit} categories={filtered}/>
        </ContainerLayout.Body>
      </ContainerLayout>


      {/* category modal */}
      <CategoryModal category={editCategory} closeModal={closeModal} open={open}/>
    </>
  )
}

export default CategoryContainer
