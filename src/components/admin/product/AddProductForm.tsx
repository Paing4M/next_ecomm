import ProductImageInput from "@/components/admin/product/ProductImageInput";
import {SEPARATORS, Tag, WithContext as ReactTags} from "react-tag-input";
import {useState} from "react";

interface AddProductFormProps {
  closeModal: () => void
  categories: CategoryHomeInterface[]
}

const AddProductForm = ({closeModal, categories}: AddProductFormProps) => {

  const [tags, setTags] = useState<Tag[]>([])

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const addProductAction = () => {
    console.log('Hello action')
  }

  return (
    <form action={addProductAction} className='space-y-3 text-gray-600'>
      <div className='flex items-center justify-between gap-2'>
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
          <input type="text" id='name' placeholder='Slug will be auto generated'
                 className='input'/>
        </div>
      </div>

      {/* images */}
      <div>
        <label className='inline-block capitalize'>
          Images
        </label>

        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4  gap-2 mx-auto place-items-center'>
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
            {categories && categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
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

  )
}

export default AddProductForm
