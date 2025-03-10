import {z} from "zod";
import mongoose from "mongoose";

export const ZReviewSchema = z.object({
  name: z.string(),
  rating: z.number(),
  comment: z.string(),
  user: z.instanceof(mongoose.Schema.Types.ObjectId),
})

export const ZProductSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  slug: z.string().trim().min(1, 'Required'),
  category: z.any().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Required',
  }),
  images: z.array(z.any()).min(1, 'Upload at least one image'),
  brand: z.string().trim().min(1, 'Required'),
  description: z.string().optional(),
  price: z.coerce.number({required_error: 'Required'}).positive('Price must be a positive number'),
  countInStock: z.coerce.number({required_error: 'Required'}).positive('InStock must be a positive number'),
  reviews: z.array(ZReviewSchema).optional(),
});

export const ZCategorySchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  slug: z.string().trim().min(1, 'Required'),
})