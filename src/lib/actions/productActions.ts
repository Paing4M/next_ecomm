import connectDb from "@/lib/db/db";
import Product, {ProductShemaI} from "@/lib/db/models/productModel";
import Category from "@/lib/db/models/categoryModel";

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

export const getAllProductBrands = async (limit: number = 10) => {
  await connectDb()

  const brands = await Product.find({
    isPublished: true,
  }).distinct('brand')

  return JSON.parse(JSON.stringify(brands)) as string[]

}


interface GetFilteredProductsI {
  brand?: string[] | undefined,
  category?: string[] | undefined,
  query?: string | undefined
  limit?: number,
}

export const getFilteredProducts = async ({brand, category, query, limit = 15}: GetFilteredProductsI) => {

  try {
    await connectDb()

    let filter: any = {}

    if (category) {
      const categorySlugs = Array.isArray(category) ? category : [category];

      const categories = await Category.find({slug: {$in: categorySlugs}}).select("_id");
      const categoryIds = categories.map(doc => doc._id);

      filter.category = {$in: categoryIds};

    }

    if (brand) filter.brand = {$in: Array.isArray(brand) ? brand : [brand]}

    if (query) filter.name = {
      $regex: query,
      $options: "i"
    };

    console.log(filter)


    const products = await Product.find(filter)
      .limit(limit)
      .sort({createdAt: -1})

    return JSON.parse(JSON.stringify(products)) as ProductShemaI[]

  } catch (e) {
    console.error('getFilteredProducts err ', e)
    throw new Error('Error getFilteredProducts .')
  }

}