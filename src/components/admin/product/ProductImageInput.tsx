import {UploadCloudIcon} from "lucide-react";

interface ProductImageInputProps {
  label?: string
  id: string
}

const ProductImageInput = ({label = 'upload', id}: ProductImageInputProps) => {

  return (
    <div className='w-[100px] bg-gray-100 rounded p-3 h-[100px]'>
      <label className='w-full capitalize h-full flex flex-col items-center justify-center text-center text-sm'
             htmlFor={id}>
        <UploadCloudIcon/>
        {label}
        <input id={id} type="file" className='hidden'/>
      </label>
    </div>
  )
}

export default ProductImageInput
