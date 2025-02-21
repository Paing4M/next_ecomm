import connectDb from "@/lib/db";
import {categories} from "@/lib/data";
import {loadEnvConfig} from "@next/env";
import Category from "@/lib/models/categoryModel";

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const categorySeeder = async () => {
  try {
    await connectDb(process.env.MONGODB_URI2)
    await Category.deleteMany()
    await Category.insertMany(categories)
    console.log('Category data seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

