import connectDb from "@/lib/db/db";
import Product from "@/lib/db/models/productModel";

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

export const getLatestProducts = async (limit: number = 4) => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
  })
    .sort({createdAt: -1})
    .limit(limit);

  return JSON.parse(JSON.stringify(products));
}