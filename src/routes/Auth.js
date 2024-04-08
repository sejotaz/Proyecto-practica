import express from 'express'
const router = express.Router()
import { loginUser, registerUser, validateEmail } from '../controllers/Auth.js'

router.get('/validateEmail/:token', validateEmail)
router.post('/create', registerUser)
router.get('/login', loginUser)

export default router
