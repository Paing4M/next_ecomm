import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {ProductSchemaI} from "@/lib/db/models/productModel";

export interface CartProductI extends ProductSchemaI {
  quantity: number
}

export interface CartI {
  products: CartProductI[]
  total: number
  // shippingPrice: number | undefined
  // paymentMethod: string | undefined
  // shippingAddress: string | undefined
}


const initialState: CartI = {
  products: [],
  total: 0,
  // shippingPrice: undefined,
  // paymentMethod: undefined
}

type CartStore = {
  cart: CartI,
  addToCart: (item: CartProductI, quantity: number) => void,
  updateItem: (item: CartProductI, quantity: number) => void,
  getQuantity: () => number,
  removeItem: (id: string) => void,
  clearCart: () => void,
}


const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialState,
      // add to cart
      addToCart: (item: CartProductI, quantity: number) => {
        const {products} = get().cart

        const existing = products.find(product => product._id === item._id)

        if (existing) {
          if (existing.countInStock < quantity + existing.quantity) {
            throw new Error('Not enough items in stock')
          }
        } else {
          if (item.countInStock < item.quantity) {
            throw new Error('Not enough items in stock')
          }
        }

        const items = existing ? products.map(product => product._id === item._id ?
            {
              ...existing,
              quantity: existing.quantity + quantity
            } : product) :
          [{...item, quantity}, ...products]

        set({
          cart: {
            ...get().cart,
            products: items as CartProductI[],
          }
        })
      },

      updateItem: (item: CartProductI, quantity: number) => {
        const {products} = get().cart
        const existing = products.find(product => product._id === item._id)
        if (!existing) return


        if (existing.countInStock < quantity + existing.quantity) {
          throw new Error('Not enough items in stock')
        }

        if (item.countInStock < item.quantity) {
          throw new Error('Not enough items in stock')
        }


        const updatedItems = products.map(product => product._id === item._id ? {
          ...existing,
          quantity: quantity
        } : product)

        set({
          cart: {
            ...get().cart,
            products: updatedItems as CartProductI[],
          }
        })

      },

      // remove from cart
      removeItem: (id: string) => {
        const {products} = get().cart
        const updatedItems = products.filter(product => product._id !== id)

        set({
          cart: {
            ...get().cart,
            products: updatedItems as CartProductI[],
          }
        })
      },


      // get total quantity
      getQuantity: () => {
        const {products} = get().cart
        const qty = products?.reduce((acc, item) => item.quantity + acc, 0)
        return qty || 0
      },

      //   clear cart
      clearCart: () => {
        set({
          cart: initialState,
        })
      }
      
    }),

    {
      name: "cart-store",
    }
  )
)

export default useCartStore