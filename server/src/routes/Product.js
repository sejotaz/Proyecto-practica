
import { ProductController } from '../controllers/Product.js'
import { AuthMiddleware } from "../middleware/verifyToken.js";

import express from "express"

const router = express.Router()
const controller = new ProductController

router.use(AuthMiddleware.validateToken)

router.post('/create', controller.productCreate)
router.patch('/update/:id', controller.productUpdate)
router.patch('/delete/:id', controller.productDelete)
router.get('/query', controller.getProduct)
router.get('/query/:id', controller.getProduct)

export default router
