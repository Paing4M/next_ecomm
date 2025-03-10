import mongoose, {Model, Document} from "mongoose";
import {ZCategorySchemaI} from "@/lib/types";

interface Category extends Document, ZCategorySchemaI {
  createdAt: Date
  updatedAt: Date
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {timestamps: true});

const Category = mongoose.models?.Category || mongoose.model<Category>('Category', categorySchema);

export default Category;