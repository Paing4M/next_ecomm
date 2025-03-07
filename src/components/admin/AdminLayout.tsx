'use client'

import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-[250px,_1fr]'>
      <AdminSidebar/>
      <div className='w-full h-full'>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
