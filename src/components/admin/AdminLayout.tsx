'use client'

import React, {useState} from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";


const AdminLayout = ({children, title}: { children: React.ReactNode, title: string }) => {
  const [open, setOpen] = useState(false)


  return (
    <div>
      <AdminSidebar
        open={open} handleOpen={() => setOpen(prev => !prev)}
        className={`${open ? 'w-[200px]' : 'w-[65px]'} `}/>
      <div className={`w-full h-full ${open ? 'pl-[200px]' : 'pl-[64px]'}`}>
        <AdminHeader className={`${open ? 'w-[calc(100%-200px)]' : 'w-[calc(100%-65px)]'} `} title={title}/>
        <div className='mt-[60px] px-4 py-2'>
          <div className='p-3'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
