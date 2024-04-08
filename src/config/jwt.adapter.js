import jwt from 'jsonwebtoken'

export class jwtAdapter {
  constructor() {}
  static async generateToken(payload , duration = '1m') {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        process.env.JWT_SEED,
        { expiresIn: duration },
        (err, token) => {
          if (err) return resolve(null)
          resolve(token)
        }
      )
    })
  }

  static validateToken(token) {
    return new Promise((resolve) => {
      jwt.verify(token, process.env.JWT_SEED, (err, decoded) => {
        if (err) return resolve(null)
        resolve(decoded)
      })
    })
  }
}