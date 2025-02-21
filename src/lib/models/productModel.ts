import mongoose from 'mongoose';


interface Product {
  name: string,
  slug: string,
  category: string,
  images: string[],
  brand: string,
  description: string,
  price: number,
  countInStock: number,
  tags: string[],
  isPublished: boolean,
  reviews: string[],
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
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
  reviews: {
    type: [String],
  },
}, {timestamps: true});

const Product = mongoose.models?.Product || mongoose.model<Product>('Product', productSchema);

export default Product;