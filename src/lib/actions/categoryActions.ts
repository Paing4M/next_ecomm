'use server'

import connectDb from "@/lib/db/db";
import Category from "@/lib/db/models/categoryModel";
import Product from "@/lib/db/models/productModel";
import {revalidateTag, unstable_cache as cache} from "next/cache";
import {ZCategorySchema} from "@/lib/validator";
import {convertZodError} from "@/lib/utils";

export const getCategoriesInUse = async () => {
  try {
    await connectDb()
    const productCategoryIds = await Product.find({}).distinct('category')
    const categories = await Category.find({
      _id: {$in: productCategoryIds},
    }).select('name slug');

    return JSON.parse(JSON.stringify(categories));

  } catch (e) {
    console.error('getCategoriesInUse err > ', e);
    throw new Error('getCategoriesInUse err');

  }
}

const _getAllCategories = async (limit: number = 20) => {
  try {
    await connectDb()
    const categories = await Category.find({})
      .select('_id name slug')
      .sort({createdAt: -1})
      .limit(limit);

    return JSON.parse(JSON.stringify(categories)) as CategoryI[];

  } catch (e) {
    console.error('getAllCategories err > ', e);
  }
}

export const getAllCategories = cache(_getAllCategories, ['getAllCategories'], {
  tags: ['Categories']
})


export const createCategory = async (prevState: FormActionI, formData: FormData): Promise<FormActionI> => {
  try {
    const data = Object.fromEntries(formData.entries());

    const validator = ZCategorySchema.safeParse(data)
    if (!validator.success) {
      return {
        error: convertZodError(validator.error),
        inputData: data
      }
    }
    await connectDb()
    await Category.create(data)
    revalidateTag('Categories')

    return {
      status: 200,
      message: `Successfully created category.`,
    }

  } catch (e: any) {
    console.log('createCategory err > ', e)
    if (e.code === 11000) {
      const errKey = Object.keys(e.keyValue)[0]

      return {
        error: {
          [errKey]: `'${Object.keys(e.keyValue)[0]}' is already exists.`
        },
      }
    }
    throw new Error('Error creating category.')

  }

}

export const updateCategory = async (prevState: FormActionI, formData: FormData): Promise<FormActionI> => {
  try {
    const data = Object.fromEntries(formData.entries());

    const validator = ZCategorySchema.safeParse(data)
    if (!validator.success) {
      return {
        error: convertZodError(validator.error),
        inputData: data
      }
    }
    await connectDb()
    const category = await Category.findById(data.id)

    category.name = data.name
    category.slug = data.slug
    await category.save()
    revalidateTag('Categories')

    return {
      status: 200,
      message: `Successfully updated category.`,
    }

  } catch (e: any) {
    console.log('createCategory err > ', e)
    if (e.code === 11000) {
      const errKey = Object.keys(e.keyValue)[0]

      return {
        error: {
          [errKey]: `'${Object.keys(e.keyValue)[0]}' is already exists.`
        },
      }
    }
    throw new Error('Error updating category.')

  }

}