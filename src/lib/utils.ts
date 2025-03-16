import {ZodError} from "zod";
import {FREE_SHIPPING_PRICE, MIN_SHIPPING_PRICE} from "@/lib/constant";


export const getImageUrl = (image: string) => {
  return `/images/products/${image}`;
}


export const convertZodError = (error: ZodError) => {
  return error.issues.reduce((acc: { [key: string]: string }, issue) => {
    acc[issue.path[0]] = issue.message
    return acc
  }, {})
}

export const calcShippingPrice = (price: number) => {

  if (price > FREE_SHIPPING_PRICE) {
    return price
  } else {
    return price + MIN_SHIPPING_PRICE
  }

}