import connectDb from "@/lib/db";
import Product from "@/lib/models/productModel";

export const getPopularProducts = async () => {
  await connectDb(process.env.MONGODB_URI2)

  const products = await Product.find({
    isPublished: true,
    tags: {$in: 'popular'}
  })

  return JSON.parse(JSON.stringify(products));
}

