import mongoose, {Schema, Types} from 'mongoose';
import {ZProductSchemaI} from "@/lib/types";
import {reviewSchema} from "@/lib/db/models/reviewModel";


export interface ProductSchemaI extends mongoose.Document, ZProductSchemaI {
  _id: string
  tags: string[]
  rating: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const productSchema = new mongoose.Schema<ProductSchemaI>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  images: {
    type: [String],
    required: true,
    default: [],
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
}, {timestamps: true});

const Product = mongoose.models?.Product || mongoose.model<ProductSchemaI>('Product', productSchema);

export default Product;