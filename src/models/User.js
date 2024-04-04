import Schema from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const modelName = 'User'
const Schema = new Schema(
  {
    _id: { type: String, default: uuidv4() },
    name: { type: String, required: true },
    lastName: { type: String, default: '' },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    emailValidated: { type: Boolean, default: false },
    password: { type: String, required: true },
    img: { type: String },
    role: {
      type: [String],
      default: ['USER_ROLE'],
      enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
  },
  {
    timestamps: true,
    versionkey: false,
    _id: false,
  }
)

export const UserModel = mongoose.model(modelName, Schema)
