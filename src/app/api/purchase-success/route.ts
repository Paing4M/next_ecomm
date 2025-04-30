import {NextRequest, NextResponse} from "next/server";
import connectDb from "@/lib/db/db";
import {stripe} from "@/lib/stripe";
import Sale from "@/lib/db/models/saleModel";
import Order, {ProductItem} from "@/lib/db/models/OrderModel";

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    const {sessionId, userEmail} = await req.json();

    if (!sessionId) {
      return NextResponse.json({success: false, error: 'Missing sessionId.'}, {status: 400});
    }

    if (!userEmail) {
      return NextResponse.json({success: false, error: 'Unauthorized.'}, {status: 401});
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      if (session?.metadata?.couponCode) {
        await Sale.findOneAndUpdate(
          {coupon: session.metadata.couponCode},
          {isValid: false}
        );
      }

      const products = JSON.parse(session?.metadata?.products || '[]');

      await Order.create({
        userEmail,
        products: products.map((p: ProductItem) => ({
          product: p,
          quantity: p.quantity,
          price: p.price,
        })),
        totalAmount: session.amount_total! / 100,
        stripeSessionId: session.id,
      });

      return NextResponse.json({success: true, message: "Purchase Success"});
    } else {
      return NextResponse.json({success: false, error: 'Payment not completed'}, {status: 400});
    }

  } catch (e: any) {
    console.log('purchaseSuccess error', e);

    if (e.code === 11000) {
      const errKey = Object.keys(e.keyValue)[0]
      return NextResponse.json({
        success: false,
        error: errKey + ' is already exists.'
      }, {status: 400});
    }


    return NextResponse.json({
      success: false,
      error: e.message || 'Internal server error',
    }, {status: 500});
  }
}
