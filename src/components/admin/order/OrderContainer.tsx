'use client'

import ContainerLayout from "@/components/admin/ContainerLayout";
import React, {useEffect, useState} from "react";
import OrderTable from "@/components/admin/order/OrderTable";

interface OrderContainerProps {
  orders: OrderI[];
}

const OrderContainer = ({orders}: OrderContainerProps) => {

  const [filtered, setFiltered] = useState<OrderI[] | []>([])
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    setFiltered(() => orders?.filter(order => order.userEmail.toLowerCase().includes(searchTerm.trim().toLowerCase()))
    )
  }, [orders, searchTerm]);
  

  return (
    <ContainerLayout>
      <ContainerLayout.Header handleSearch={(value: string) => setSearchTerm(value)}
                              placeHolder={'Search user email ....'}/>
      <ContainerLayout.Body>
        <OrderTable orders={filtered}/>
      </ContainerLayout.Body>
    </ContainerLayout>
  )
}
export default OrderContainer
