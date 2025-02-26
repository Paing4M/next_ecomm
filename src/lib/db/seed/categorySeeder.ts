import connectDb from "@/lib/db/db";
import {categories} from "@/lib/db/data";
import {loadEnvConfig} from "@next/env";
import Category from "@/lib/db/models/categoryModel";

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

