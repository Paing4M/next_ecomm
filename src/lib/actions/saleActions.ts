import connectDb from "@/lib/db/db";
import Sale from "@/lib/db/models/saleModel";

export const getLatestSale = async () => {
  try {
    await connectDb();
    const sale = await Sale.findOne({
      isValid: true,
    }).limit(1).sort({createdAt: -1})

    return sale
  } catch (e) {
    console.error('get sale error ', e);
    throw new Error('get sale error');
  }

}