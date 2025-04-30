import mongoose, {model, models} from "mongoose";

export interface ProductItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface OrderInterface extends Document {
  userEmail: string
  products: ProductItem[]
  totalAmount: number
  stripeSessionId: string
  createdAt: Date
  updatedAt: Date
}

const orderSchema = new mongoose.Schema<OrderInterface>({
  userEmail: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  stripeSessionId: {
    type: String,
    required: true,
    unique: true,
  }
}, {timestamps: true});

const Order = models.Order || model<OrderInterface>('Order', orderSchema);


export default Order;
