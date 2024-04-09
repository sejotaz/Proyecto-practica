import express from 'express';
import authRouter from './Auth.js'
import categoryRouter from './Category.js'
const router = express.Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)

export default router