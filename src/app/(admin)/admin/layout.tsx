import React from "react";
import type {Metadata} from "next";


export const metadata: Metadata = {
  title: {
    template: "Ecomm Admin | %s",
    default: 'Ecomm Admin'
  },
  description: "What do you want to buy?. We got everything.",
};

const AdminLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <main className='w-full min-h-[calc(100vh-60px)] bg-gray-100'>
      {children}
    </main>
  )
}

export default AdminLayout
