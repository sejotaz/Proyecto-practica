import express from 'express'
const router = express.Router()
import { registerUser, validateEmail } from '../controllers/Auth.js'

router.get('/validateEmail/:token', validateEmail)
router.post('/create', registerUser)

export default router
