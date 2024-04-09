import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'


const modelName = 'Category'
const Schema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    categoryName: { type: String, required: true, unique: true },
    isAvaliable: { type: Boolean, default: false },
    userId: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
)

export const CategoryModel = mongoose.model(modelName, Schema)