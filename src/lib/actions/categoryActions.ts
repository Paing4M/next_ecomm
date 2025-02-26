import connectDb from "@/lib/db/db";
import Category from "@/lib/db/models/categoryModel";
import Product from "@/lib/db/models/productModel";

export const getAllCategories = async () => {
  try {
    await connectDb()
    const productCategoryIds = await Product.find({}).distinct('category')
    const categories = await Category.find({
      _id: {$in: productCategoryIds},
    }).select('name slug');

    return JSON.parse(JSON.stringify(categories));

  } catch (e) {
    console.error('getAllCategories err > ', e);
    throw new Error('getAllCategories err');

  }
}