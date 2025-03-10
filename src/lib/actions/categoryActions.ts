'use server'

import connectDb from "@/lib/db/db";
import Category from "@/lib/db/models/categoryModel";
import Product from "@/lib/db/models/productModel";

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

export const getAllCategories = async (limit: number = 20) => {
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