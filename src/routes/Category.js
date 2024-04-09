import express from 'express'
import { categoryCreate } from '../controllers/Category.js'
const router = express.Router()

router.get('/create', categoryCreate)

export default router