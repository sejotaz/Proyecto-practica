export class ProductEntity{
  constructor(
    _id,
    productName,
    isAvaliable,
    categoryId,
    userId,
    quantity,
    price,
    isRemove,
  ){
    this._id = _id
    this.productName = productName
    this.isAvaliable = isAvaliable
    this.categoryId = categoryId
    this.userId = userId
    this.quantity = quantity
    this.price = price
    this.isRemove = isRemove
  }

  static fromObject(object){
    const { _id, productName, isAvaliable, categoryId, userId, quantity, price, isRemove  } = object
    if(!_id) throw new Error('ID_IS_REQUIRED')
    if(!productName) throw new Error('PRODUCT_NAME_IS_REQUIRED')
    if(typeof isAvaliable !== 'boolean') throw new Error('INCORRECT_DATA')
    if(!categoryId) throw new Error('CATEGORY_IS_REQUIRED')
    if(!userId) throw new Error('USER_IS_REQUIRED')
    if(!quantity) throw new Error('QUANTITY_IS_REQUIRED')
    if(!price) throw new Error('PRICES_IS_REQUIRED')
    return new ProductEntity(_id, productName, isAvaliable, categoryId, userId, quantity, price)
  }

}