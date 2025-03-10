'use client'

import React, {useState} from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import {MenuIcon} from "lucide-react";

const AdminLayout = ({children, title}: { children: React.ReactNode, title: string }) => {
  const [open, setOpen] = useState(false)


  return (
    <div>
      <AdminSidebar
        open={open} handleOpen={() => setOpen(prev => !prev)}
        className={`${open ? 'w-[200px]' : 'w-fit'} `}/>
      <div className={`w-full h-full ${open ? 'pl-[200px]' : 'pl-[64px]'}`}>
        <AdminHeader title={title}/>
        <div className='mt-[65px] px-4 py-2'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
