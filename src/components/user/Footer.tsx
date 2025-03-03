'use client'

import {useClerk} from "@clerk/nextjs";
import Link from "next/link";

const Footer = () => {

  const {openSignIn, openUserProfile, user} = useClerk()

  return (
    <div className='p-3 py-5 bg-black text-white max-w-[1300px] mx-auto px-2 md:px-3'>

      <div
        className='w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 gap-y-6 px-6'>

        <div>
          <h3 className='text-xl font-semibold mb-3'>
            Support
          </h3>

          <p className='mb-3 text-sm text-gray-300 cursor-pointer'>
            example@gmail.com
          </p>

          <p className='text-sm text-gray-300 cursor-pointer'>
            +123-456789
          </p>
        </div>


        <div>
          <h3 className='text-xl font-semibold mb-3'>
            Account
          </h3>

          <ul className='flex flex-col'>
            {user && (
              <li>
                <p onClick={() => openUserProfile()} className='cursor-pointer text-sm text-gray-300 mb-3'>
                  My Profile
                </p>
              </li>
            )}

            {!user && (
              <li>
                <p onClick={() => openSignIn()} className='text-sm cursor-pointer text-gray-300 mb-3'>
                  Sign in | Register
                </p>
              </li>
            )}

            <li>
              <Link className='text-sm text-gray-300 inline-block mb-3' href={'/cart'}>Cart</Link>
            </li>

            <li>
              <Link className='text-sm text-gray-300 inline-block' href={'/shop'}>Shop</Link>
            </li>

          </ul>
        </div>


        <div>
          <h3 className='text-xl font-semibold mb-3'>
            Quick Link
          </h3>

          <p className='mb-3 text-sm text-gray-300 cursor-pointer'>
            Privacy Policy
          </p>

          <p className='mb-3 text-sm text-gray-300 cursor-pointer'>
            Terms & Conditions
          </p>

          <p className='text-sm text-gray-300 cursor-pointer'>
            FAQ
          </p>

        </div>


      </div>

      <div className='text-sm mt-3 w-full p-3 pb-0 text-center text-gray-600'>
        &#169; Copyright 2025
      </div>
    </div>
  )
}
export default Footer
