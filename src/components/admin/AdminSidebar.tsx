'use client'

import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BoxesIcon,
  BoxIcon,
  LayoutDashboardIcon,
  LogOutIcon, Menu, MenuIcon,
  ShoppingBagIcon,
  ShoppingCartIcon
} from "lucide-react";
import {usePathname} from "next/navigation";

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


  return (
    <div
      className={`fixed top-0 px-2 bg-white h-screen overflow-y-scroll scrollbar-hide ${className}`}>
      <div className='h-[60px] py-3'>

        <div className='flex gap-x-2 items-center relative'>
          <Image className={`${open ? 'inline-block' : 'hidden'}`} src='/images/logo.png' height='100' width='100'
                 alt='logo-ecomm'/>
          <div onClick={handleOpen}
               className='font-bold px-3 py-2 cursor-pointer  rounded-full bg-blue-500 text-white w-fit absolute right-0 top-0'>

            {open ? (
              <ArrowLeft className='w-6 h-6 '/>
            ) : (
              <ArrowRight className='w-6 h-6 '/>
            )}

          </div>
        </div>

      </div>

      <div className='mt-[0.5rem]'>
        <nav>
          <ul className='flex flex-col gap-y-6'>
            {
              links.map(({name, href, icon: Icon}, idx) => (
                <li key={name + "-" + idx}>
                  <Link href={href}
                        className={`flex gap-x-3 px-3 py-2 rounded hover:bg-blue-500 hover:text-white ${pathname === href ? 'bg-blue-500 text-white' : ''}`}>{Icon}
                    <span className={`${open ? 'inline-block' : 'hidden'}`}>{name}</span></Link>
                </li>
              ))
            }
            <li>
              <button className='flex gap-x-3 px-3 py-2 rounded hover:bg-blue-500 hover:text-white w-full'>
                <LogOutIcon/>
                <span className={`${open ? 'inline-block' : 'hidden'}`}>Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  )
}

export default AdminSidebar
