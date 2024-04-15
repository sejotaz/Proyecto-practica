import { bcryptAdapter } from '../config/encrypt.js'
import { regularExps } from '../config/regular-expression.js'
import { UserEntity } from '../domain/entities/Users.js'
import { UserModel } from '../models/User.js'
import { EmailService } from '../services/email.service.js'
import { HtmlEmailAdapter } from '../config/htmlValidateEmail.js'
import { jwtAdapter } from '../config/jwt.adapter.js'
import { CreateUserDto } from '../domain/dtos/User/user-create.dto.js'
import { CreateSessionDto } from '../domain/dtos/Session/session-create.dto.js'

export class RegisterUserController {
  constructor() {}

  registerUser = async (req, res) => {
    try {
      const [err, createUserDto] = CreateUserDto.createUserDto(req.body)
      if (err) throw new Error(`${err}`)
      const register = new UserModel(createUserDto)
    console.log(createUserDto);
      register.password = bcryptAdapter.hash(createUserDto.password)
      const user = await register.save()
      const token = await jwtAdapter.generateToken({ _id: user._id }, '15m')
      const link = `${process.env.APP_ROUTE}${process.env.VALIDATE_EMAIL_ROUTE}/${token}`
      const options = {
        to: createUserDto.email,
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

  validateEmail = async (req, res) => {
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

  loginUser = async (req, res) => {
    try {
      const { username, email, password } = req.body
      if (email && username) throw new Error('DECIDITE PUES HPTA')
      if (email) {
        if (!regularExps.email.test(email)) throw new Error('EMAIL_INVALID')
      }
    console.log({password, username})
      if (!password) throw new Error('PASSWORD_REQUIRED')
      const user = await UserModel.findOne({ $or: [{ email }, { username }] })
      const [error, sessionDto] = CreateSessionDto.createSessionDto(user)
      console.log(sessionDto);
      if(error)throw new Error(error)
      const token = await jwtAdapter.generateToken(
        {
          ...sessionDto
        },
        '24h'
      )
      const isPasswordValid = bcryptAdapter.compare(password, user.password)
      console.log({ isPasswordValid })
      if (!isPasswordValid) throw new Error('PASSWOD INVALID')
      res.json({ token })
    } catch (e) {
      res.status(404).json({ error: e.message })
    }
  }
}
