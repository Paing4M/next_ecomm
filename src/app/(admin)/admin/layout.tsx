import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
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
    <main className='w-full min-h-screen bg-gray-100 overflow-hidden'>
      {children}
    </main>
  )
}

export default AdminLayout
