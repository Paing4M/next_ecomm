'use client'

import useCartStore, {CartProductI} from "@/hooks/useCartStore";
import Link from "next/link";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import React, {useState} from "react";
import useIsMounted from "@/hooks/useIsMounted";
import {toast} from "react-toastify";
import {FREE_SHIPPING_PRICE, MIN_SHIPPING_PRICE} from "@/lib/constant";
import {applyCoupon} from "@/lib/actions/productActions";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

const CartContainer = () => {
  const [coupon, setCoupon] = useState<string>('')
  const [discount, setDiscount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)


  const {cart, updateItem, removeItem} = useCartStore()

  // console.log('total', cart.total)

  const getTotalPrice = (discount: number = 0): number => {
    const products = cart.products || []

    const subtotal = products.reduce((acc, item) => acc + (item.quantity * item.price), 0)

    const discountAmount = (discount / 100) * subtotal
    const discountedSubtotal = subtotal - discountAmount

    const shipping = subtotal > FREE_SHIPPING_PRICE ? 0 : MIN_SHIPPING_PRICE

    return discountedSubtotal + shipping
  }


  const isMounted = useIsMounted();

  if (cart?.products.length === 0) return <p className='text-redBackground py-2 px-3 text-center w-full'>Your cart is
    empty. <Link href={'/products'} className='text-black font-semibold underline'>Shop Now</Link></p>

  const handleQuantity = (product: CartProductI, quantity: number) => {
    try {
      updateItem(product, quantity)
    } catch (e: any) {
      toast.error(e.message || e.data.message)
    }

  }

  const calcSubtotal = () => {
    const price = cart.products?.reduce((acc, item) => acc + (item.quantity * item.price), 0)
    return Number(price)
  }


  const handleCheckout = async () => {
    setIsLoading(true)
    const stripe = await stripePromise

    try {
      const res = await fetch(`/api/checkout`, {
        method: "POST",
        body: JSON.stringify({
          products: cart.products,
          couponCode: coupon || null,
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
      const data = await res.json()
      if (data.sessionId) {
        const res = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        })

        if (res?.error) {
          console.log('stripe err ', res.error)
        }
      }

    } catch (e) {
      console.log('Checkout err ', e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCoupon = async () => {
    try {
      const res = await applyCoupon(coupon!)
      if (res.status === 200) {
        setDiscount(res.data?.discount)
        toast.success('Coupon applied.')
      }

    } catch (e: any) {
      toast.error(e.message || e.data.message)
    }

  }


  return (
    <div className='grid grid-cols-6 gap-2'>
      <div className='overflow-x-auto col-span-6 md:col-span-4 '>
        <table
          className='w-full text-left text-gray-700'>
          <thead>
          <tr className='bg-white border overflow-hidden text-black'>
            <th className='text-lg font-semibold py-2 px-3'>
              Product
            </th>

            <th className='text-lg font-semibold py-2 px-3'>
              Price
            </th>

            <th className='text-lg font-semibold py-2 px-3'>
              Quantity
            </th>

            <th className='text-lg font-semibold py-2 px-3'>
              SubTotal
            </th>

            <th className='text-lg font-semibold py-2 px-3'>
              Action
            </th>

          </tr>
          </thead>

          <tbody>
          {cart?.products.map((product) => (
            <tr key={product._id} className='bg-white border-r border-l '>
              <td className='py-2 px-3'>
                <div className='flex items-center gap-2'>
                  <Image width={80} height={80} className='object-contain' src={getImageUrl(product.images[0])}
                         alt={product._id}/>
                  <h2 className='overflow-hidden truncate text-black'>{product.name}</h2>
                </div>
              </td>

              <td className='py-2 px-3 min-w-[80px]'>$ {product.price.toFixed(2)}</td>

              <td className='py-2 px-3'>
                <select onChange={e => handleQuantity(product as CartProductI, Number(e.target.value))}
                        className='w-[80px] p-2 rounded border-none outline-none focus:ring-2 ring-blue-500'
                        defaultValue={product.quantity}>
                  {[...Array(product.countInStock)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </td>

              <td className='py-2 px-3'>
                $ {(product.quantity * product.price).toFixed(2)}
              </td>

              <td className='py-2 px-3'>
                <button onClick={() => removeItem(product._id)}
                        className='px-3 py-1 bg-redBackground rounded text-white'>Remove
                </button>
              </td>

            </tr>
          ))}

          {isMounted && (

            <tr className='border'>
              <td colSpan={5} className='py-2 px-3 text-right'>
                SubTotal: <span className='font-semibold'>$ {calcSubtotal().toFixed(2)}</span>
              </td>
            </tr>
          )}

          </tbody>
        </table>

      </div>


      <div className='w-full col-span-6 md:col-span-2  flex justify-end'>
        <div className='w-full sm:w-[400px] shadow-sm py-4 px-3 rounded border'>
          <h2 className='text-lg font-semibold'>Cart Total</h2>

          {isMounted && (

            <div className='mt-4'>
              <div className='flex items-center justify-between'>
                <h4 className='text-gray-700 '>Subtotal:</h4>
                <p className='text-gray-700 font-semibold'>$ {calcSubtotal().toFixed(2)}</p>
              </div>

              <hr className='my-2'/>

              <div className='flex items-center justify-between'>
                <h4 className='text-gray-700 '>Shipping:</h4>
                <p className='text-gray-700'>
                  {getTotalPrice() > FREE_SHIPPING_PRICE ? 'Free' : '$ ' + MIN_SHIPPING_PRICE}
                </p>
              </div>

              <hr className='my-2'/>

              {discount && (
                <div className='text-gray-700'>
                  <p className='text-sm'>Coupon applied</p>
                  <div className='flex items-center justify-between'>
                    <h4>Discount:</h4>
                    <p>
                      {discount} %
                    </p>
                  </div>

                  <hr className='my-2'/>
                </div>
              )}

              <div className='flex items-center justify-between'>
                <h4 className='text-gray-700 '>Total:</h4>
                <p className='text-gray-700 font-semibold text-lg'>
                  $ {getTotalPrice(discount!).toFixed(2)}
                </p>
              </div>

              <hr className='my-2'/>

              {!discount && (
                <div className='flex w-auto items-center gap-2 border rounded'>
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    type="text" className='py-1 w-full px-2 border-none outline-none'
                    placeholder={'Enter coupon ...'}/>
                  <button
                    onClick={handleCoupon}
                    className='bg-redBackground px-2 py-1 rounded-r cursor-pointer text-white'>apply
                  </button>
                </div>
              )}

              <div className='flex mt-4 justify-center'>
                <button
                  onClick={() => handleCheckout()}
                  disabled={isLoading}
                  className={`px-2 w-full max-w-[220px] py-2 rounded bg-redBackground text-white `}>
                  {isLoading ? 'Processing...' : 'Proceed to checkout'}
                </button>
              </div>

            </div>

          )}


        </div>

      </div>
    </div>
  )
}

export default CartContainer
