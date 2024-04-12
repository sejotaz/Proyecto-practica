import { CategoryModel } from '../../../models/Category.js'

export class CreateCategoryDto {
  constructor(categoryName, isAvaliable, userId) {
    ;(this.categoryName = categoryName),
      (this.isAvaliable = isAvaliable),
      (this.userId = userId)
  }
  static async createCategory(props) {
    const { categoryName, isAvaliable = false, user } = props
    const existingCategory = await CategoryModel.countDocuments({
      categoryName,
    })
    if (!!existingCategory) return ['CATEGORY_ALREADY_EXIST']
    if (!categoryName) return ['REQUERIED_FIELD']
    if (!user) return ['REQUIRED_USER0']
    if(!user.role.includes('ADMIN_ROLE')) return ['UNAUTHORIZED_USER']
    let available
    if (typeof isAvaliable === 'string') {
      available =
        isAvaliable === 'true' ? true : isAvaliable === 'false' ? false : null
    }
    return [undefined, new CreateCategoryDto(categoryName, available, user._id)]
  }

  static async updateCategory(props) {
    // const categoryId = req.params.id
    const { categoryName, isAvaliable, userId, isRemove } = props
    return [undefined, new CreateCategoryDto(categoryName, isAvaliable, userId, isRemove)]
  }
}
