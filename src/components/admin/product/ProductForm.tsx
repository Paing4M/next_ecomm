import React, {useActionState, useEffect, useRef, useState} from "react";
import {SEPARATORS, Tag, WithContext as ReactTags} from "react-tag-input";
import {createProduct, updateProduct} from "@/lib/actions/productActions";
import ErrorMsg from "@/components/ErrorMsg";
import {UploadCloudIcon, XIcon} from "lucide-react";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import {ProductSchemaI} from "@/lib/db/models/productModel";
import {toast} from "react-toastify";
import slugify from "react-slugify";


interface ProductFormProps {
  closeModal: () => void
  categories: CategoryI[]
  editProduct: ProductSchemaI | null
}

const initialState: FormActionI = {}

const suggestionArr = [
  'popular',
  'android',
  'apple',
  '5g',
  'gaming',
]

const ProductForm = ({closeModal, categories, editProduct}: ProductFormProps) => {

  const [tags, setTags] = useState<Tag[]>(editProduct?.tags?.map(tag => ({
    className: '',
    id: tag,
    text: tag,
  })) || [])
  const [images, setImages] = useState<string[]>(editProduct?.images || []);


  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(editProduct ? updateProduct : createProduct, initialState)
  const [input, setInput] = useState<Partial<ProductSchemaI>>(state.inputData || editProduct || initialState);
  const [slug, setSlug] = useState(state.inputData?.slug || editProduct?.slug || '');


  useEffect(() => {
    if (state.status === 200) {
      toast.success(state?.message)
      formRef?.current?.reset()
      setImages([])
      closeModal()
    }


    if (state.inputData) {
      setInput(state.inputData)
    }

  }, [state]);


  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target?.files;
      if (files && files.length > 0) {
        const data = new FormData();
        data.append('image', files[0]);
        const response = await fetch('/api/upload', {
          method: "POST",
          body: data
        })
        const res = await response.json()
        if (res) {
          setImages(prevState => (prevState ? [...prevState, res.name] : [res.name]))
        }
      }
    } catch (e) {
      console.error('handleImage error ', e);
    }
  }


  const removeImage = async (name: string) => {

    try {
      const formData = new FormData();
      formData.append('name', name);
      const response = await fetch('/api/upload', {
        method: "DELETE",
        body: formData
      })
      const res = await response.json()
      if (res) {
        setImages(prev => prev?.filter((file) => file !== name));
      }
    } catch (e) {
      console.error('removeImage ', e);
    }
  }

  const handleSlug = (e: React.ChangeEvent<HTMLInputElement>) => {

    setSlug(slugify(e.target.value));

  }


  const suggestions: Tag[] = suggestionArr.map((item: string) => ({
    id: item,
    text: item,
    className: ''
  }))


  return (
    <form ref={formRef} action={formAction} className='space-y-3 text-gray-600'>
      <div className='flex items-start justify-between gap-2'>
        {/* edit id */}
        {
          editProduct &&
          <input readOnly defaultValue={editProduct?._id} type="text" name='_id' hidden className='hidden'/>
        }

        {/* name */}
        <div>
          <label htmlFor="name" className='inline-block capitalize'>
            Name
          </label>
          <input defaultValue={input.name} onChange={handleSlug} name='name' type="text" id='name'
                 placeholder='Type here ...'
                 className={`input ${state?.error?.name && 'border-redBackground'}`}/>
          {state?.error?.name && <ErrorMsg error={state?.error?.name}/>}
        </div>

        {/* slug */}
        <div>
          <label htmlFor="name" className='inline-block capitalize'>
            Slug
          </label>
          <input value={slug} onChange={handleSlug} name='slug'
                 type="text"
                 id='name'
                 placeholder='Slug will be auto generated'
                 className={`input ${state?.error?.slug && 'border-redBackground'}`}/>
          {state?.error?.slug && <ErrorMsg error={state?.error?.slug}/>}
        </div>
      </div>

      {/* images */}
      <div>
        <label className='inline-block capitalize'>
          Images
        </label>

        <div className='flex items-start gap-3 flex-wrap'>
          {images && images.length > 0 && (
            <>
              {
                images.map((image, index) => (
                  <div key={image + index} className='bg-gray-100 rounded w-[100px] h-[100px]  p-2'>
                    <div className='w-full h-full relative p-2'>
                      <Image fill src={getImageUrl(image)} className='object-contain' alt='img'/>
                      <div
                        onClick={() => removeImage(image)}
                        className='w-fit cursor-pointer hover:scale-105 transition ease-linear h-fit p-1 absolute top-0 right-0 bg-redBackground rounded-full'>
                        <XIcon className='text-white w-4 h-4'/>
                      </div>
                    </div>
                  </div>
                ))
              }
            </>
          )}

          {!images || images?.length < 4 && (
            <label
              className=' cursor-pointer capitalize flex flex-col items-center justify-center text-center text-xs bg-gray-100 rounded w-[100px] h-[100px]  p-2'
              htmlFor='image'>
              <UploadCloudIcon/>
              Upload
              <input onChange={handleImage} id={'image'} type="file"
                     className='hidden'/>
            </label>
          )}
          <input readOnly hidden className='hidden' type="text" name='images'
                 value={JSON.stringify(images)}/>
        </div>


        {state?.error?.images && <ErrorMsg error={state?.error?.images}/>}
      </div>


      {/* tags */
      }
      <div>
        <label htmlFor="tags" className='inline-block capitalize'>Tags (e.g: "popular")</label>
        <ReactTags
          suggestions={suggestions}
          id='tags'
          maxTags={4}
          tags={tags}
          separators={[SEPARATORS.COMMA, SEPARATORS.ENTER]}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="bottom"
          placeholder='Type tag here (seperate with "comma/," or "enter")'
          autocomplete
          allowDragDrop={false}/>
        <input hidden className='hidden' type="text" name='tags' value={JSON.stringify(tags.map(tag => tag.id)) || []}
               readOnly/>
      </div>


      <div className='flex items-start justify-between gap-x-2'>
        {/* category */}
        <div className='w-full'>
          <label htmlFor="category" className='inline-block capitalize'>Category</label>

          <select defaultValue={input.category} name='category' id='category'
                  className={`input !py-[10px] ${state?.error?.category && 'border-redBackground'}`}>
            <option value="" className='text-gray-400 '>Select Category</option>
            {categories && categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          {state?.error?.category && <ErrorMsg error={state?.error?.category}/>}
        </div>

        {/* brand */}
        <div className='w-full'>
          <label htmlFor="brand" className='inline-block capitalize'>Brand</label>
          <input defaultValue={input.brand} name='brand' type="text" id='brand'
                 className={`input ${state?.error?.brand && 'border-redBackground'}`} placeholder='Type here ...'/>
          {state?.error?.brand && <ErrorMsg error={state?.error?.brand}/>}
        </div>
      </div>


      <div className='flex items-start justify-between gap-x-2'>
        {/* price */}
        <div>
          <label htmlFor="price" className='inline-block capitalize'>Price</label>
          <input defaultValue={input.price} name='price' type="number" id='price'
                 className={`input ${state?.error?.price && 'border-redBackground'}`} placeholder='Type here ...'/>
          {state?.error?.price && <ErrorMsg error={state?.error?.price}/>}
        </div>

        {/* count in stock */}
        <div>
          <label htmlFor="countInStock" className='inline-block capitalize'>InStock</label>
          <input defaultValue={input.countInStock} name='countInStock' type="number" id='countInStock'
                 className={`input ${state?.error?.countInStock && 'border-redBackground'}`}
                 placeholder='Type here ...'/>
          {state?.error?.countInStock && <ErrorMsg error={state?.error?.countInStock}/>}
        </div>

      </div>

      {/* isPublished */}
      <div className='flex gap-2 items-center'>
        <input defaultChecked={input.isPublished} name='isPublished' type="checkbox" id='isPublished'
               className='cursor-pointer select-none'/>
        <label htmlFor="isPublished" className='select-none'>Published</label>
      </div>

      {/* desc */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea defaultValue={input.description} placeholder='Type here ...' name="description" id="description"
                  cols={40}
                  className='input'></textarea>
      </div>


      <div className='flex items-center justify-between gap-x-2'>
        <button
          onClick={closeModal}
          className='border px-3 py-1 rounded focus:outline-none hover:bg-redBackground hover:text-white'>Cancel
        </button>

        <button type='submit' className='border px-3 py-1 rounded focus:outline-none bg-blue-600 text-white'>
          {editProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>

    </form>

  )
}

export default ProductForm
