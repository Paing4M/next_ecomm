'use client'

import Modal, {ModalProps} from "@/components/modal/Modal";
import ProductImageInput from "@/components/admin/product/ProductImageInput";
import {Tag, WithContext as ReactTags, SEPARATORS} from "react-tag-input";
import {useState} from "react";


const AddProductModal = ({open, closeModal}: Partial<ModalProps>) => {

  const [tags, setTags] = useState<Tag[]>([])

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };


  console.log(tags)


  return (
    <Modal open={open} closeModal={closeModal!}>
      <Modal.Title>
        Add Product
      </Modal.Title>
      <hr className='my-2'/>
      <div>
        <form action="" className='space-y-3 text-gray-600'>
          {/* name */}
          <div>
            <label htmlFor="name" className='inline-block capitalize'>
              Product Name
            </label>
            <input type="text" id='name' placeholder='Type here ...'
                   className='input'/>
          </div>

          {/* slug */}
          <div>
            <label htmlFor="name" className='inline-block capitalize'>
              Product Slug
            </label>
            <input disabled type="text" id='name' placeholder='Slug will be auto generated'
                   className='input'/>
          </div>

          {/* images */}
          <div>
            <label className='inline-block capitalize'>
              Images
            </label>

            <div className='grid grid-cols-4 mx-auto place-items-center'>
              <ProductImageInput id='img-1' label='upload (primary)'/>
              <ProductImageInput id='img-2'/>
              <ProductImageInput id='img-3'/>
              <ProductImageInput id='img-4'/>
            </div>
          </div>


          {/* tags */}
          <div>
            <label htmlFor="tags" className='inline-block capitalize'>Tags</label>
            <ReactTags
              id='tags'
              maxTags={4}
              tags={tags}
              separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              inputFieldPosition="bottom"
              placeholder='Type tag here (press "Enter" or ",")'
              autocomplete
              allowDragDrop={false}/>
          </div>


          <div className='flex items-center justify-between gap-x-2'>

            {/* category */}
            <div className='w-full'>
              <label htmlFor="category" className='inline-block capitalize'>Category</label>
              <select id='category' className='input !py-[10px]'>
                <option value="" className='text-gray-400 '>Select Category</option>
                <option value="1">apple</option>
              </select>
            </div>

            {/* brand */}
            <div className='w-full'>
              <label htmlFor="brand" className='inline-block capitalize'>Brand</label>
              <input type="text" id='brand'
                     className='input' placeholder='Type here ...'/>
            </div>
          </div>


          <div className='flex items-center justify-between gap-x-2'>
            {/* price */}
            <div>
              <label htmlFor="price" className='inline-block capitalize'>Price</label>
              <input type="number" id='price'
                     className='input' placeholder='Type here ...'/>
            </div>

            {/* count in stock */}
            <div>
              <label htmlFor="countInStock" className='inline-block capitalize'>InStock</label>
              <input type="number" id='countInStock'
                     className='input' placeholder='Type here ...'/>
            </div>

          </div>

          {/* desc */}
          <div>
            <label htmlFor="description">Description</label>
            <textarea placeholder='Type here ...' name="description" id="description" cols={40}
                      className='input'></textarea>
          </div>


          <div className='flex items-center justify-between gap-x-2'>
            <button
              onClick={closeModal}
              className='border px-3 py-1 rounded focus:outline-none hover:bg-redBackground hover:text-white'>Cancel
            </button>

            <button className='border px-3 py-1 rounded focus:outline-none bg-blue-600 text-white'>Add Product</button>
          </div>

        </form>

      </div>
    </Modal>
  )
}

export default AddProductModal
