import type {Metadata} from "next";
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/dashboard/Dashboard";

export const metadata: Metadata = {
  title: 'Dashboard',
  description: "Admin dashboard.",
};

const Page = () => {
  return (
    <AdminLayout title={'dashboard'}>
      <Dashboard/>
    </AdminLayout>
  )
}

export default Page
