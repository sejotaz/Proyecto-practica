import { CategoryModel } from "../../../models/Category.js"

export class CreateCategoryDto {
  constructor(
    categoryName,
    isAvaliable,
    userId
    ) {
    this.categoryName = categoryName,
    this.isAvaliable = isAvaliable,
    this.userId = userId
  }
  static async createCategory(props) {
    const { categoryName, isAvaliable, userId } = props
    const existingCategory = await CategoryModel.countDocuments({categoryName})
    if(!!existingCategory) return['CATEGORY_ ALREADY_EXIST']
    if (!categoryName) return['REQUERIED_FIELD']
    if (!userId) return ['REQUIRED_USER0']
    let available;
    if (typeof isAvaliable === 'string') {
      available =
        isAvaliable === 'true' ? true : isAvaliable === 'false' ? false : null
    }



    return [undefined, new CreateCategoryDto(categoryName, available, userId)]
  }
}
