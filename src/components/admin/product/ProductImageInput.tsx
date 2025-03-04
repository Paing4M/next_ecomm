import {UploadCloudIcon} from "lucide-react";

interface ProductImageInputProps {
  label?: string
  id: string
}

const ProductImageInput = ({label = 'upload', id}: ProductImageInputProps) => {

  return (
    <div className='bg-gray-100 rounded w-[100px] h-[100px] p-2'>
      <label
        className='w-full cursor-pointer capitalize h-full flex flex-col items-center justify-center text-center text-xs'
        htmlFor={id}>
        <UploadCloudIcon/>
        {label}
        <input id={id} type="file" className='hidden'/>
      </label>
    </div>
  )
}

export default ProductImageInput
