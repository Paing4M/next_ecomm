import React from "react";
import AdminProductList from "@/components/admin/product/AdminProductList";
import CreateButton from "@/components/admin/CreateButton";
import ContainerHeader from "@/components/admin/ContainerHeader";
import ContainerChildren from "@/components/admin/ContainerChildren";

interface ContainerLayoutProps {
  children: React.ReactNode
}

const ContainerLayout = ({children}: ContainerLayoutProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

ContainerLayout.Button = CreateButton
ContainerLayout.Header = ContainerHeader
ContainerLayout.Body = ContainerChildren

export default ContainerLayout
