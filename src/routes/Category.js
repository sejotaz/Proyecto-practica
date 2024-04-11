import express from 'express'
import { CategoryController } from '../controllers/Category.js'
const router = express.Router()
const controller = new CategoryController()

router.post('/create', controller.categoryCreate)
router.patch('/update/:id', controller.categoryUpdate)
router.patch('/delete/:id', controller.categoryDelete)
router.get('/query', controller.getCategory)
router.get('/query/:id', controller.getCategoryById)

export default router