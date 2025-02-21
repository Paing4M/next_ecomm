import {Schema, models, model, Model} from 'mongoose'


interface SaleInterface {
  _id: string,
  name: string,
  discount: number,
  coupon: string,
  createdAt: Date,
  updatedAt: Date,
}

const saleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  coupon: {
    type: String,
    min: 5,
  },
  isValid: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

const Sale = models?.Sale as Model<SaleInterface> || model<SaleInterface>('Sale', saleSchema)

export default Sale