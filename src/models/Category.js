import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const modelName = 'Category'
const Schema = new mongoose.Schema(
  {
    _id: {type: String, default: uuidv4},
    categoryName: {type: String, required: true},
    
  })