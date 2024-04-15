import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'

const modelName = 'Product'
const Schema = new mongoose.Schema(
{
  _id: {type: String, default: uuidv4},
  productName: { type: String, required: true, unique: true },
  isAvaliable: { type: Boolean, default: false },
  categoryId: { type: String },
  userId: { type: String, ref: 'User' },
  quantity: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  isRemove: { type: Boolean, default: false }
},
{
  timestamps: true,
  versionKey: false,
  _id: false
})

export const ProductModel = mongoose.model(modelName, Schema)