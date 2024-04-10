import express from 'express'
import { CategoryController } from '../controllers/Category.js'
const router = express.Router()
const controller = new CategoryController()

router.post('/create', controller.categoryCreate)
router.get('/query', controller.category)

export default router