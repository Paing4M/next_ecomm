import React from "react";
import Header from "@/components/user/Header";
import Footer from "@/components/user/Footer";

const UserLayout = ({children}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className='max-w-[1300px] mx-auto px-2 md:px-3'>
        <Header/>
        <div className='min-h-[calc(100vh-70px)]'>
          {children}
        </div>
      </div>

      <div className='bg-black text-white'>
        <Footer/>
      </div>
    </>
  )
}

export default UserLayout
