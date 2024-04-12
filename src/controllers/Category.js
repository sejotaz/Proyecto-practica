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
      const role = req.body.user.role
      console.log(role);
      const categories = await CategoryModel.find({ isRemove: false })

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
      console.log({ category })
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
      res.json(CategoryEntity.fromObject(update))
    } catch (e) {}
  }
  categoryDelete = async (req, res) => {
    const categoryId = req.params.id
    await CategoryModel.updateOne({ _id: categoryId }, { isRemove: true })
    res.json(true)
  }
}
