import mongoose, {Model} from "mongoose";

interface Category {
  name: string;
  slug: string;
  description: string;
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
}, {timestamps: true});

const Category = mongoose.models?.Category || mongoose.model<Category>('Category', categorySchema);

export default Category;