export class CategoryEntity{
  constructor(
    _id,
    categoryName,
    isAvaliable,
    userId,
    isRemove
    ) {
    this._id = _id,
    this.categoryName = categoryName,
    this.isAvaliable = isAvaliable,
    this.userId = userId
    this.isRemove = isRemove
  }

  static fromObject(object){
    const { _id, categoryName, isAvaliable, userId, isRemove} = object
    if(!_id) throw new Error('ID_IS_REQUIRED')
    if(!categoryName) throw new Error('CATEGORY_NAME_IS_REQUIRED')
    if(typeof isAvaliable !== 'boolean') throw new Error('INCORRECT_DATA')
    if(!userId) throw new Error('USER_IS_REQUIRED')
    return new CategoryEntity(_id, categoryName, isAvaliable, userId, isRemove)  
  }

}  