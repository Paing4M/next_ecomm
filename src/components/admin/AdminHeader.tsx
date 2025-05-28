'use client'

import React from "react";
import UserInfoUI from "@/components/UserInfoUI";
import {useClerk} from "@clerk/nextjs";

interface AdminHeaderProps {
  className?: string
  title: string
}

const AdminHeader = ({title, className}: AdminHeaderProps) => {

  const {openSignIn} = useClerk()

  return (
    <header className={`fixed top-0 h-[60px] bg-white flex items-center px-4 ${className}`}>
      <div className='flex items-center w-full h-full justify-between'>
        <h1 className=' text-[1.5rem] capitalize font-bold'>{title}</h1>
        <UserInfoUI handleSignInModal={openSignIn}/>
      </div>
    </header>
  )
}

export default AdminHeader
