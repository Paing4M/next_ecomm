import connectDb from "@/lib/db/db";
import Product, {ProductShemaI} from "@/lib/db/models/productModel";

export const getPopularProducts = async (limit: number = 5) => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
    tags: {$in: 'popular'}
  }).limit(limit);

  return JSON.parse(JSON.stringify(products)) as ProductShemaI[]
}


export const getLimitProducts = async (limit: number = 8) => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
  }).limit(limit);

  return JSON.parse(JSON.stringify(products)) as ProductShemaI[]
}

export const getLatestProducts = async (limit: number = 4) => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
  })
    .sort({createdAt: -1})
    .limit(limit);

  return JSON.parse(JSON.stringify(products)) as ProductShemaI[]
}

export const getProductBySlug = async (slug: string) => {
  await connectDb()

  const product = await Product.findOne({
    slug
  })

  return JSON.parse(JSON.stringify(product)) as ProductShemaI

}


export const getRelatedProductByCategory = async (slug: string, limit: number = 4) => {
  await connectDb()

  const product = await Product.findOne({
    slug,
  })
  if (product) {
    const products = await Product.find({
      isPublished: true,
      category: product.category,
      _id: {$ne: product._id}
    }).limit(limit)

    return JSON.parse(JSON.stringify(products)) as ProductShemaI[]

  }

  throw new Error('Product not found.')

}