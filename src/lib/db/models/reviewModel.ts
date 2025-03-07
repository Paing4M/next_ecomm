import {model, models, Schema, Types} from "mongoose";
import {ZReviewSchemaI} from "@/lib/types";


export interface ReviewInterface extends Document, ZReviewSchemaI {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}


const reviewSchema = new Schema<ReviewInterface>({
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {timestamps: true});

const Review = models.Review || model<ReviewInterface>('Review', reviewSchema);

export default Review;