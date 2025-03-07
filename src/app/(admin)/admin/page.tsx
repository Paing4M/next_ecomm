import type {Metadata} from "next";
import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLayout from "@/components/admin/AdminLayout";

export const metadata: Metadata = {
  title: 'Dashboard',
  description: "Admin dashboard.",
};

const Page = () => {
  return (
    <AdminLayout>
      <AdminHeader title={'dashboard'}/>
      <div className='mt-[1rem] px-4'>
        this is dashboard
      </div>
    </AdminLayout>
  )
}

export default Page
