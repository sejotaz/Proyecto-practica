import express from 'express'
import { CategoryController } from '../controllers/Category.js'
const router = express.Router()
const controller = new CategoryController()
router.get('/create', controller.categoryCreate)

export default router