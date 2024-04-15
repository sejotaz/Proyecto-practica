import { CreateCategoryDto } from '../domain/dtos/Category/category-create.dto.js'
import { CategoryEntity } from '../domain/entities/Category.js'
import { CategoryModel } from '../models/Category.js'
export class CategoryController {
  constructor() {}
  categoryCreate = async (req, res) => {
    try {
      // const { categoryName, isAvaliable, userId } = req.body
      const [err, createCategoryDto] = await CreateCategoryDto.createCategory(
        req.body
      )
      if (err) throw new Error(`${err}`)
      const createCategory = await new CategoryModel(createCategoryDto).save()
      res.json(CategoryEntity.fromObject(createCategory))
    } catch (e) {
      console.log(e)
      res.status(404).json({ error: e.message })
    }
  }
  getCategory = async (req, res) => {
    try {
      const categories = await CategoryModel.find({ isRemove: false }).populate(
        'userId'
      )
      res.json(
        categories.map((category) => CategoryEntity.fromObject(category))
      )
    } catch (e) {
      console.log({ e })
      res.status(404).json({ e })
    }
  }

  getCategoryById = async (req, res) => {
    try {
      const categoryId = req.params.id
      const category = await CategoryModel.findOne({ _id: categoryId })
      res.json(CategoryEntity.fromObject(category))
    } catch (e) {
      res.status(404).json({ e })
    }
  }

  categoryUpdate = async (req, res) => {
    try {
      const categoryId = req.params.id
      const [err, updateCategory] = await CreateCategoryDto.updateCategory(
        req.body
      )
      if (err) throw new Error(`${err}`)
      const update = await CategoryModel.findOneAndUpdate(
        { _id: categoryId },
        updateCategory,
        { new: true }
      )
      res.json(update)
    } catch (e) {
      res.status(404).json({ e })
    }
  }
  categoryDelete = async (req, res) => {
    try {
      const user = req.body.user
      if (!user.role.includes('ADMIN_ROLE'))
        throw new Error('UNANOTORIZED_USER')
      const categoryId = req.params.id
      await CategoryModel.updateOne({ _id: categoryId }, { isRemove: true })
      res.json(true)
    } catch (e) {
      res.status(404).json({ e })
    }
  }
}
