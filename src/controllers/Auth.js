import { validate } from 'uuid'
import { bcryptAdapter } from '../config/encrypt.js'
import { regularExps } from '../config/regular-expression.js'
import { UserEntity } from '../entities/Users.js'
import { UserModel } from '../models/User.js'
import { EmailService } from '../services/email.service.js'
import { HtmlEmailAdapter } from '../config/htmlValidateEmail.js'
import { jwtAdapter } from '../config/jwt.adapter.js'

export const registerUser = async (req, res) => {
  try {
    // console.log(req.headers)
    // const token1 = req.headers.authorization
    // console.log();
    // return 1
    const { name, lastName, username, email, password } = req.body
    if (!email) throw new Error('EMAIL_EMPTY')
    if (!regularExps.email.test(email)) throw new Error('EMAIL_INVALID')
    const register = new UserModel({
      name,
      lastName,
      username,
      email,
      password,
    })
    register.password = bcryptAdapter.hash(password)
    const user = await register.save() // revisar este await
    const token = await jwtAdapter.generateToken({ _id: user._id }, '15m')
    const link = `${process.env.APP_ROUTE}${process.env.VALIDATE_EMAIL_ROUTE}/${token}`
    const options = {
      to: email,
      subject: 'Validate Email',
      htmlBody: HtmlEmailAdapter.htmlValidateEmail(link),
    }
    const emailService = new EmailService()
    const sent = await emailService.sendEmail(options)
    res.json(UserEntity.fromObject(user))
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}

export const validateEmail = async (req, res) => {
  try {
    const token = req.params.token
    const payload = await jwtAdapter.validateToken(token)
    if (!payload) throw new Error('INVALID_TOKEN')
    const userUpdated = await UserModel.findOneAndUpdate(
      { _id: payload._id },
      { emailValidated: true }
    )
    console.log({ userUpdated })
    if (!userUpdated) throw new Error('UPDATED_FAILED')
    res.send(HtmlEmailAdapter.htmlValidatedEmailSuccess())
  } catch (e) {
    res.status(401).send(HtmlEmailAdapter.htmlValidatedEmailFailure())
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (email && username) throw new Error('DECIDITE PUES HPTA')
    if (email) {
      if (!regularExps.email.test(email)) throw new Error('EMAIL_INVALID')
    }
    if (!password) throw new Error('PASSWORD_REQUIRED')
    const user = await UserModel.findOne({ $or: [{ email }, { username }] })
    const token = await jwtAdapter.generateToken({
      id: user._id,
      email: user.email,
    }, '15m')
    const isPasswordValid = bcryptAdapter.compare(password, user.password)
    console.log({ isPasswordValid })
    if (!isPasswordValid) throw new Error('PASSWOD INVALID')
    res.json({ token })
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}
