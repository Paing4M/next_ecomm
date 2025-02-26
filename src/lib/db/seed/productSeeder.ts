import connectDb from "@/lib/db/db";
import Product from "@/lib/db/models/productModel";
import {products as data} from "@/lib/db/data";
import {loadEnvConfig} from "@next/env";

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const productSeeder = async () => {
  try {
    await connectDb(process.env.MONGODB_URI2)
    await Product.deleteMany()
    await Product.insertMany(data)
    console.log('Product data seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed database')
  }
}

