'use client'

import React, {useActionState, useEffect, useRef, useState} from "react";
import {createCategory, updateCategory} from "@/lib/actions/categoryActions";
import ErrorMsg from "@/components/ErrorMsg";
import slugify from "react-slugify";
import {toast} from "react-toastify";

interface CategoryFormProps {
  closeModal: () => void
  category: CategoryI | null
}

const initialState: FormActionI = {}

const CategoryForm = ({closeModal, category}: CategoryFormProps) => {

  const [state, formAction] = useActionState(category ? updateCategory : createCategory, initialState)

  const [slug, setSlug] = useState(category?.name || '');
  const [name, setName] = useState(category?.slug || '');

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.status === 200) {
      toast.success(state.message)
      formRef.current?.reset()
      closeModal()
    }
  }, [state]);


  return (
    <form ref={formRef} action={formAction} className='space-y-3'>

      {/* edit id */}
      {category && (
        <input readOnly type="text" hidden className='hidden' name='id' value={category?._id}/>
      )}

      <div>
        <label htmlFor="name" className='inline-block capitalize'>
          Name
        </label>
        <input value={name} name='name' type="text" id='name'
               placeholder='Type here ...'
               onChange={e => {
                 setName(e.target.value)
                 setSlug(slugify(e.currentTarget.value));
               }}
               className={`input ${state?.error?.name && 'border-redBackground'}`}/>

        {state?.error?.name && <ErrorMsg error={state?.error?.name}/>}
      </div>

      <div>
        <label htmlFor="slug" className='inline-block capitalize'>
          Slug
        </label>
        <input onChange={e => setSlug(slugify(e.target.value))} value={slug} name='slug' type="text" id='slug'
               placeholder='Type here ...'
               className={`input ${state?.error?.slug && 'border-redBackground'}`}/>

        {state?.error?.slug && <ErrorMsg error={state?.error?.slug}/>}
      </div>


      <div className='flex items-center justify-between gap-x-2'>
        <button type='button'
                onClick={closeModal}
                className='border px-3 py-1 rounded focus:outline-none hover:bg-redBackground hover:text-white'>Cancel
        </button>

        <button type='submit' className='border px-3 py-1 rounded focus:outline-none bg-blue-600 text-white'>
          {category ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </form>
  )
}

export default CategoryForm
