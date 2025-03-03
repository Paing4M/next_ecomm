import React from "react";

interface AdminHeaderProps {

  title: string
}

const AdminHeader = ({title}: AdminHeaderProps) => {
  return (
    <header>
      <div className='flex items-center bg-white w-full px-4 py-2 h-[60px]'>
        <h1 className='text-[1.5rem] capitalize font-bold'>{title}</h1>
      </div>
    </header>
  )
}

export default AdminHeader
