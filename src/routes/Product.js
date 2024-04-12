
import { ProductController } from '../controllers/Product.js'
import { AuthMiddleware } from "../middleware/verifyToken.js";

import express from "express"

const router = express.Router()
const controller = new ProductController

router.use(AuthMiddleware.validateToken)

router.post('/create', controller.productCreate)

export default router
