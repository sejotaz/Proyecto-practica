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
  category = async (req, res) => {
    try {
      const categories = await CategoryModel.find()
      
      res.json(categories.map(category=> CategoryEntity.fromObject(category)))
    } catch (e) {
      console.log({ e })
      res.status(404).json({ e })
    }
  }
}
