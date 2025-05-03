'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BoxIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  ShoppingBagIcon,
  ShoppingCartIcon
} from "lucide-react";
import {usePathname} from "next/navigation";
import {useClerk} from "@clerk/nextjs";

const links = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboardIcon/>
  },
  {
    name: 'Order',
    href: '/admin/order',
    icon: <ShoppingCartIcon/>
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: <ShoppingBagIcon/>
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: <BoxIcon/>
  },
]

interface AdminSidebarProps {
  className?: string
  open: boolean
  handleOpen: () => void
}

const AdminSidebar = ({className, open, handleOpen}: AdminSidebarProps) => {

  const pathname = usePathname();
  const {signOut} = useClerk()


  return (
    <div
      className={`fixed top-0 px-2 bg-white h-screen ${className}`}>
      <div className='h-[60px] py-3'>

        <div className='flex gap-x-2 items-center justify-between'>
          <Image className={`${open ? 'inline-block' : 'hidden'}`} src='/images/logo.png' height='100' width='100'
                 alt='logo-ecomm'/>
          <div onClick={handleOpen}
               className='font-bold px-3 py-2 cursor-pointer  rounded-full bg-blue-500 text-white w-fit '>

            {open ? (
              <ChevronLeftIcon className='w-6 h-6 '/>
            ) : (
              <ChevronRightIcon className='w-6 h-6 '/>
            )}

          </div>
        </div>

      </div>

      <div className='mt-[0.5rem]'>
        <nav>
          <ul className='flex flex-col gap-y-6'>
            {
              links.map(({name, href, icon: Icon}, idx) => (
                <li key={name + "-" + idx} className='relative group'>
                  <Link href={href}
                        className={`flex gap-x-3 px-3 py-2 rounded hover:bg-blue-500 hover:text-white ${pathname === href ? 'bg-blue-500 text-white' : ''}`}>{Icon}
                    <span className={`${open ? 'inline-block' : 'hidden'}`}>{name}</span></Link>

                  {!open && (
                    <div
                      className='bg-white ring-2 ring-blue-500 absolute right-[-100px] top-[50%] transform translate-y-[-50%] text-sm px-3 py-1 text-center z-[30] rounded-full min-w-[100px] shadow-2xl hidden group-hover:block'>
                      {name}
                    </div>
                  )}


                </li>
              ))
            }
            <li className='relative group'>
              <button onClick={() => signOut({redirectUrl: '/'})}
                      className='flex gap-x-3 px-3 py-2 rounded hover:bg-blue-500 hover:text-white w-full'>
                <LogOutIcon/>
                <span className={`${open ? 'inline-block' : 'hidden'}`}>Sign Out</span>
              </button>

              {!open && (
                <div
                  className='bg-white ring-2 ring-blue-500 absolute right-[-100px] top-[50%] transform translate-y-[-50%] text-sm px-3 py-1 text-center z-[30] rounded-full min-w-[100px] shadow-2xl hidden group-hover:block'>
                  Logout
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>

    </div>
  )
}

export default AdminSidebar
