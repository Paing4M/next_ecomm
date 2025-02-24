import connectDb from "@/lib/db";
import Product from "@/lib/models/productModel";

export const getPopularProducts = async (limit: number = 5) => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
    tags: {$in: 'popular'}
  }).limit(limit);

  return JSON.parse(JSON.stringify(products));
}


export const getLimitProducts = async (limit: number = 8) => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
  }).limit(limit);

  return JSON.parse(JSON.stringify(products));
}