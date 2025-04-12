'use client'

import {useActionState, useEffect, useState} from "react";
import {addProductReview} from "@/lib/actions/productActions";
import ErrorMsg from "@/components/ErrorMsg";
import {toast} from "react-toastify";

interface ProductReviewContainerProps {
  productId: string
}

const initialState: FormActionI = {}

const ProductReviewContainer = ({productId}: ProductReviewContainerProps) => {
  const [activeTag, setActiveTag] = useState(1);

  const [state, formAction] = useActionState(addProductReview, initialState)

  useEffect(() => {
    if (state?.status == 200) {
      toast.success(state?.message)
    }

    if (state?.error?.product) {
      toast.error(state.error?.product)
    }

    if (state?.error?.auth) {
      toast.error(state.error?.auth)
    }
  }, [state]);


  const handleTagChange = (value: number) => setActiveTag(value)

  return (
    <div className='mx-auto w-full max-w-[900px]'>

      <div className='flex items-start flex-col sm:flex-row gap-x-1 gap-y-4'>
        <div className='flex-1 sm:flex-[1] w-full'>
          <div onClick={() => handleTagChange(1)}
               className={`text-lg font-bold cursor-pointer mb-4 ${activeTag === 1 ? 'text-blue-500' : 'text-black'}`}>Write
            Your Review
          </div>
          <div onClick={() => handleTagChange(2)}
               className={`text-lg font-bold cursor-pointer ${activeTag === 2 ? 'text-blue-500' : 'text-black'}`}>All
            Reviews
          </div>
        </div>


        <div className='flex-1 sm:flex-[2] w-full'>
          {activeTag === 1 ? (
            <form action={formAction} className='w-full'>

              <input type="text" hidden className='hidden' readOnly name='productId' value={productId}/>
              <div className='space-y-3 w-full'>
                <div>
                  <label htmlFor="rating">Rating</label>
                  <select name="rating" className='input'>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    name='comment'
                    cols={10}
                    placeholder='Enter your comment ...'
                    className={`w-full input auto_text ${state?.error?.comment && 'border-redBackground'}`}></textarea>
                  {state?.error?.comment && <ErrorMsg error={state?.error?.comment}/>}
                </div>
              </div>

              <div>
                <button type='submit'
                        className='mt-3 border-none outline-none px-3 py-2 rounded bg-blue-500 text-white'>Submit
                </button>
              </div>
            </form>

          ) : ('')}
        </div>

      </div>


    </div>
  )
}

export default ProductReviewContainer
