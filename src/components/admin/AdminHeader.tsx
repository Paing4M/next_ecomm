import React from "react";

interface AdminHeaderProps {

  title: string
}

const AdminHeader = ({title}: AdminHeaderProps) => {
  return (
    <header className='fixed top-0 w-full h-[60px] bg-white flex items-center px-4'>
      <div className='flex items-center  w-full '>
        <h1 className='text-[1.5rem] capitalize font-bold'>{title}</h1>
      </div>
    </header>
  )
}

export default AdminHeader
