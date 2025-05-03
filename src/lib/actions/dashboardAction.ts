import connectDb from "@/lib/db/db";
import {createClerkClient} from "@clerk/backend";
import Order from "@/lib/db/models/OrderModel";


const clerkClient = createClerkClient({secretKey: process.env.CLERK_SECRET_KEY});

export const dashboardData = async () => {
  try {
    await connectDb()
    const userCount = await clerkClient.users.getCount()
    const orderCount = await Order.countDocuments()
    const sale = await Order.aggregate([{
      $group: {
        _id: null,
        total: {$sum: '$totalAmount'}
      }
    }])
    const totalSale = sale[0]?.total || 0;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setUTCDate(today.getUTCDate() - 6);


    const rawSaleData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gt: sevenDaysAgo,
            $lte: new Date()
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {format: "%Y-%m-%d", date: "$createdAt"}
          },
          total: {$sum: "$totalAmount"}
        }
      },
      {
        $sort: {_id: 1}
      }
    ]);

    const fullDateMap: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setUTCDate(d.getUTCDate() + i);
      const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
      fullDateMap[dateStr] = 0;
    }


    rawSaleData.forEach((item) => {
      fullDateMap[item._id] = item.total;
    });


    const saleData = Object.entries(fullDateMap).map(([date, total]) => ({
      date,
      total
    }));


    return {
      success: true,
      data: {
        userCount,
        orderCount,
        totalSale,
        saleData
      }
    }


  } catch (e: any) {
    console.log('dashboardData err : ', e)
    throw new Error(e.message)
  }
}