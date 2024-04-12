import express from 'express';
import authRouter from './Auth.js'
import categoryRouter from './Category.js'
import productRouter from './Product.js'
const router = express.Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)

export default router