import { ProductModel } from "../../../models/Product.js";

export class CreatePoductDto {
  constructor(productName, isAvaliable, categoryId, userId, quantity, price){
    this.productName = productName
    this.isAvaliable = isAvaliable
    this.categoryId = categoryId
    this.userId = userId
    this.quantity = quantity
    this.price = price
  }

  static async createProduct(props){
    const { productName, isAvaliable = false, categoryId, user, quantity, price } = props
    const existingProduct = await ProductModel.countDocuments({
      productName
    })
    if(!!existingProduct) return ['PRODUCT_ALREADY_EXIST']
    if(!productName) return ['REQUIRED_FIELD']
    if(!categoryId) return ['REQUIRED_FIELD']
    if(!user) return ['REQUIRED_FIELD']
    if (!user.role.includes('ADMIN_ROLE')) return ['UNAUTHORIZED_USER']
    if(!quantity) return ['REQUIRED_FIELD']
    if(!price) return ['REQUIRED_FIELD']
    let available
    if (typeof isAvaliable === 'string') {
      available =
        isAvaliable === 'true' ? true : isAvaliable === 'false' ? false : null
    }

    return [undefined, new CreatePoductDto(productName, available, categoryId, user._id, parseInt(quantity), parseFloat(price))]

  }

}