'use client'

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {BoxesIcon, BoxIcon, LayoutDashboardIcon, LogOutIcon, ShoppingBagIcon, ShoppingCartIcon} from "lucide-react";
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
  className?: string;
}

const AdminSidebar = ({className}: AdminSidebarProps) => {

  const pathname = usePathname();

  console.log(pathname)


  return (
    <div
      className='w-full bg-white  h-screen overflow-hidden overflow-y-scroll scrollbar-hide'>
      <Link href={'/admin'} className='w-full h-[60px] block py-2 px-4'>
        <Image src='/images/logo.png' height='100' width='100' alt='logo-ecomm'/>
      </Link>

      <div className='mt-[1rem] px-4'>
        <nav>
          <ul className='flex flex-col gap-y-6'>
            {
              links.map(({name, href, icon: Icon}, idx) => (
                <li key={name + "-" + idx}>
                  <Link href={href}
                        className={`flex gap-x-3 px-3 py-2 rounded hover:bg-blue-500 hover:text-white ${pathname === href ? 'bg-blue-500 text-white' : ''}`}>{Icon} {name}</Link>
                </li>
              ))
            }
            <li>
              <button className='flex gap-x-3 px-3 py-2 rounded hover:bg-blue-500 hover:text-white w-full'>
                <LogOutIcon/>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  )
}

export default AdminSidebar
