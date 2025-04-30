import mongoose, {Document} from "mongoose";
import {ZCategorySchemaI} from "@/lib/types";

interface CategoryInterface extends Document, ZCategorySchemaI {
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

const Category = mongoose.models?.Category || mongoose.model<CategoryInterface>('Category', categorySchema);

export default Category;