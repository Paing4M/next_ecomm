import {NextRequest, NextResponse} from "next/server";
import {stripe} from "@/lib/stripe";
import Sale from "@/lib/db/models/saleModel";
import {FREE_SHIPPING_PRICE, MIN_SHIPPING_PRICE} from "@/lib/constant";
import {currentUser} from "@clerk/nextjs/server";


export const POST = async (req: NextRequest) => {

  const body = await req.json()
  const products = body.products || []
  const couponCode = body.couponCode || null
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress

  if (!user && !userEmail) {
    return NextResponse.json({message: 'Unauthenticated'}, {status: 401})
  }

  if (!Array.isArray(products) || products.length === 0) {
    return NextResponse.json({message: 'There is no products array'}, {status: 400})
  }

  let totalAmount = 0

  const lineItems = products.map((product) => {
    const amount = Number(product.price) * 100
    totalAmount += amount * product.quantity

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [`${process.env.CLIENT_URL}/images/products/${product.images[0]}`],
          // images: ['https://images.unsplash.com/photo-1743963256202-810324f9ba56?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
        },
        unit_amount: amount,
      },
      quantity: product.quantity || 1,
    }
  })


  let coupon = null

  if (couponCode) {
    coupon = await Sale.findOne({coupon: couponCode})
    if (coupon) {
      totalAmount -= (totalAmount * coupon.discount) / 100
    }
  }


  const shippingPrice = totalAmount > (FREE_SHIPPING_PRICE * 100) ? 0 : MIN_SHIPPING_PRICE * 100


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    discounts: coupon ? [{
      coupon: await createStripeCoupon(coupon.discount)
    }] : undefined,
    metadata: {
      userEmail: userEmail ?? '',
      couponCode: couponCode ?? '',
      products: JSON.stringify(
        products.map(p => {
          return {
            _id: p._id,
            quantity: p.quantity,
            price: p.price
          }
        })
      )
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: shippingPrice > 0 ? 'Standard Shipping' : 'Free Shipping',
          type: 'fixed_amount',
          fixed_amount: {
            amount: shippingPrice,
            currency: 'usd',
          },
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 3},
            maximum: {unit: 'business_day', value: 5},
          },
        },
      },
    ],
    success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  })


  return NextResponse.json({
    'sessionId': session.id,
    'message': 'Checkout successfully.',
  })
}

const createStripeCoupon = async (percent: number) => {

  const coupon = await stripe.coupons.create({
    percent_off: percent,
    duration: 'once'
  })

  return coupon.id
}