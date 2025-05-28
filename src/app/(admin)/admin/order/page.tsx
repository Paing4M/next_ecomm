import AdminLayout from "@/components/admin/AdminLayout";
import OrderContainer from "@/components/admin/order/OrderContainer";
import {getAllOrders} from "@/lib/actions/orderAction";

const OrderPage = async () => {
  const orders = await getAllOrders()

  return (
    <AdminLayout title={'Order'}>
      <OrderContainer orders={orders}/>
    </AdminLayout>
  )
}
export default OrderPage
