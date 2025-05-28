import connectDb from "@/lib/db/db";
import Order from "@/lib/db/models/OrderModel";

export const getAllOrders = async () => {
  try {
    await connectDb()
    const orders = await Order.find({})
    return JSON.parse(JSON.stringify(orders))
  } catch (e) {
    console.log('get all orders err : ', e)
  }
}