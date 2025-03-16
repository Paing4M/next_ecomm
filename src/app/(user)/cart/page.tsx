import {Metadata} from "next";
import CartContainer from "@/components/user/cart/CartContainer";

export const metadata: Metadata = {
  title: "Cart",
}

const CartPage = () => {
  return (
    <div className='py-3'>
      <CartContainer/>
    </div>
  )
}

export default CartPage
