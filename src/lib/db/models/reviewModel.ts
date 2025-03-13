import {model, models, Schema, Types} from "mongoose";
import {ZReviewSchemaI} from "@/lib/types";


export interface ReviewInterface extends Document, ZReviewSchemaI {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}


export const reviewSchema = new Schema<ReviewInterface>({
  rating: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }

}, {timestamps: true});

const Review = models.Review || model<ReviewInterface>('Review', reviewSchema);

export default Review;