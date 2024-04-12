import { jwtAdapter } from '../config/jwt.adapter.js'
import { UserModel } from '../models/User.js'

export class AuthMiddleware {
  constructor() {}
  static async validateToken(req, res, next) {
    try {
      const token = req.headers.authorization
      if (!token) throw new Error('TOKEN_EMPTY')
      const payload = await jwtAdapter.validateToken(token)
    console.log({payload})
      if (!payload) throw new Error('TOKEN_ERROR')
      const user = await UserModel.findOne({ _id: payload._id }).lean()
      if (!user) throw new Error('USER_NOT_FOUND')
      req.body.user = user
      next()
    } catch (e) {
      res.status(404).json({ e: e.message })
    }
  }
}
