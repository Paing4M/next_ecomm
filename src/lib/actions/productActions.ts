'use server'

import connectDb from "@/lib/db/db";
import Product, {ProductSchemaI} from "@/lib/db/models/productModel";
import Category from "@/lib/db/models/categoryModel";
import {ZProductSchema, ZReviewSchema} from "@/lib/validator";
import {convertZodError} from "@/lib/utils";
import {revalidateTag, unstable_cache as cache} from "next/cache";
import path from "node:path";
import fs from "node:fs";
import {NextResponse} from "next/server";
import Sale from "@/lib/db/models/saleModel";
import {currentUser} from "@clerk/nextjs/server";

export const getPopularProducts = async (limit: number = 5) => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
    tags: {$in: 'popular'}
  }).limit(limit);

  return JSON.parse(JSON.stringify(products)) as ProductSchemaI[]
}


const _getLimitProducts = async (limit: number = 8) => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
  })
    .sort({createdAt: -1})
    .limit(limit);

  return JSON.parse(JSON.stringify(products)) as ProductSchemaI[]
}

export const getLimitProducts = cache(_getLimitProducts, ['getLimitProducts'], {
  tags: ['Products']
})

export const getLatestProducts = async () => {
  await connectDb()

  const products = await Product.find({
    isPublished: true,
  })
    .sort({createdAt: -1})
    .limit(4);

  return JSON.parse(JSON.stringify(products)) as ProductSchemaI[]
}

const _getProductBySlug = async (slug: string) => {
  await connectDb()

  const product = await Product.findOne({
    slug
  })

  return JSON.parse(JSON.stringify(product)) as ProductSchemaI

}

export const getProductBySlug = cache(_getProductBySlug, ['getProductBySlug'], {
  tags: ['ProductBySlug']
})


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

    return JSON.parse(JSON.stringify(products)) as ProductSchemaI[]
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
  brand?: string[] | undefined
  category?: string[] | undefined
  tag?: string[] | undefined
  query?: string | undefined
  limit?: number
}

export const getFilteredProducts = async ({tag, brand, category, query, limit = 15}: GetFilteredProductsI) => {

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

    if (tag) filter.tags = {$in: Array.isArray(tag) ? tag : [tag]}

    if (query) filter.name = {
      $regex: query,
      $options: "i"
    };


    const products = await Product.find(filter)
      .limit(limit)
      .sort({createdAt: -1})

    return JSON.parse(JSON.stringify(products)) as ProductSchemaI[]

  } catch (e) {
    console.error('getFilteredProducts err ', e)
    throw new Error('Error getFilteredProducts .')
  }

}

export const getProductTags = async () => {
  try {
    await connectDb()
    const tags = await Product.find({}).distinct('tags')

    return JSON.parse(JSON.stringify(tags)) as string[]
  } catch (e) {
    console.error(e)
    throw new Error('Error in getProductTags.')
  }
}

// create product
export const createProduct = async (prevState: FormActionI, formData: FormData): Promise<FormActionI> => {

  try {
    const data = handleFormData(formData)

    const validator = ZProductSchema.safeParse(data)
    if (!validator.success) {
      return {
        error: convertZodError(validator.error),
        inputData: data as ProductSchemaI
      }
    }

    await connectDb()
    await Product.create(data)
    revalidateTag('Products')
    return {
      message: `Successfully created product.`,
      status: 200,
    }

  } catch (e: any) {
    console.error(e)
    // check duplicate error
    if (e.code === 11000) {
      const errKey = Object.keys(e.keyValue)[0]

      return {
        error: {
          [errKey]: `'${Object.keys(e.keyValue)[0]}' is already exists.`
        },
      }
    }

    throw new Error('Error creating product.')
  }
}


// update 
export const updateProduct = async (prevState: FormActionI, formData: FormData): Promise<FormActionI> => {
  try {
    const data = handleFormData(formData)
    const product_id = data._id

    const validator = ZProductSchema.safeParse(data)
    if (!validator.success) {
      return {
        error: convertZodError(validator.error),
        inputData: data as ProductSchemaI
      }
    }

    await connectDb()
    await Product.findByIdAndUpdate(product_id, data, {new: true})
    revalidateTag('Products')

    return {
      message: `Successfully updated product.`,
      status: 200,
    }
  } catch (e: any) {
    console.error(e)
    // check duplicate error
    if (e.code === 11000) {
      const errKey = Object.keys(e.keyValue)[0]

      return {
        error: {
          [errKey]: `'${Object.keys(e.keyValue)[0]}' is already exists.`
        },

      }
    }

    throw new Error('Error creating product.')
  }

}

const handleFormData = (formData: FormData) => {
  const data = Object.fromEntries(formData.entries()) as Partial<ProductSchemaI>
  data.tags = JSON.parse(formData.get('tags') as string)
  data.images = JSON.parse(formData.get('images') as string)
  data.brand = data.brand?.toLowerCase()
  data.isPublished = !!formData.get('isPublished')
  return data
}


export const deleteProduct = async (id: string): Promise<any> => {
  try {
    await connectDb()
    const product: ProductSchemaI | null = await Product.findById(id)

    if (product) {
      const images = product.images as string[]
      for (const image of images) {
        await deleteImage(image)
      }
    }

    const res = await Product.findByIdAndDelete(id)
    revalidateTag('Products')
    return {
      message: `Successfully deleted product.`,
      status: 200,
    }
  } catch (e) {
    console.error(e)
    throw new Error('Error deleting product.')
  }
}

const deleteImage = async (name: string) => {
  const filePath = path.join(process.cwd(), 'public', 'images', 'products', name)
  fs.unlink(filePath, (err) => {
    if (err) {
      return NextResponse.json({
        'message': 'Image delete failed. Please try again later.'
      }, {status: 400})
    }
  })
}


export const addProductReview = async (prevState: FormActionI, formData: FormData): Promise<FormActionI> => {
  try {
    const user = await currentUser()

    if (!user) {
      return {
        error: {
          auth: 'Please login to review product.',
        }
      }
    }

    const comment = formData.get('comment') as string
    const rating = formData.get('rating') as number | null
    const productId = formData.get('productId') as string
    const username = user.fullName as string
    const userEmail = user.emailAddresses[0].emailAddress as string

    const validator = ZReviewSchema.safeParse({comment, rating: Number(rating)})

    if (!validator.success) {
      return {
        error: convertZodError(validator.error),
      }
    }

    if (!productId) {
      return {
        error: {
          product: 'Product not found',
        }
      }
    }

    await connectDb()
    const product = await Product.findById(productId) as ProductSchemaI

    if (!product) {
      return {
        error: {
          product: "Product not found",
        }
      }
    }


    const alreadyReviewed = product.reviews?.find(r => r.email === userEmail)

    if (alreadyReviewed) {
      return {
        error: {
          'product': 'Product is already reviewed.',
        }
      }
    }

    const review = {
      username,
      rating: Number(rating),
      comment: comment,
      email: userEmail
    }

    product?.reviews?.push(review)
    product.rating = product?.reviews?.reduce((acc, item) => item.rating + acc, 0) as number
    await product.save()
    revalidateTag('ProductBySlug')

    return {
      message: `Successfully reviewed product.`,
      status: 200,
    }

  } catch (e: any) {
    console.error(e)
    throw new Error('Error in addProductReview.')
  }

}

export const applyCoupon = async (coupon: string) => {
  await connectDb()
  const sale = await Sale.findOne({
    coupon,
    isValid: true
  })


  if (!sale) {
    throw new Error('Invalid coupon.')
  }

  return {
    status: 200,
    data: JSON.parse(JSON.stringify(sale))
  }

}