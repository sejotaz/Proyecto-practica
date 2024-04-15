import { CreateProductDto } from '../domain/dtos/Product/product-create.dto.js'
import { ProductEntity } from '../domain/entities/Products.js'
import { ProductModel } from '../models/Product.js'

export class ProductController {
  constructor() {}
  productCreate = async (req, res) => {
    try {
      const [err, createProductDto] = await CreateProductDto.createProduct(
        req.body
      )
      if (err) throw new Error(`${err}`)
      const createProduct = await new ProductModel(createProductDto).save()
      res.json(ProductEntity.fromObject(createProduct))
    } catch (e) {
      res.status(404).json(e.message)
    }
  }

  getProduct = async (req, res) => {
    try {
      const products = await ProductModel.find({ isRemove: false }).populate(
        'userId'
      )
      res.json(products.map((product) => ProductEntity.fromObject(product)))
    } catch (e) {
      res.status(404).json(e.message)
    }
  }

  getProductById = async (req, res) => {
    try {
      const productId = req.params.id
      const product = await ProductModel.findOne({ _id: productId })
      res.json(ProductEntity.fromObject(product))
    } catch (e) {
      res.status(404).json({ e })
    }
  }

  productUpdate = async (req, res) => {
    try {
      const productId = req.params.id
      const [err, updateProduct] = await CreateProductDto.updateProduct(
        req.body
      )
      if (err) throw Error(`${err}`)
      const update = await ProductModel.findOneAndUpdate(
        { _id: productId },
        updateProduct,
        { new: true }
      )
      res.json(update)
    } catch (e) {
      res.status(404).json({ e })
    }
  }
  productDelete = async (req, res) => {
    try {
      const user = req.body.user
      if (!user.role.includes('ADMIN_ROLE'))
        throw new Error('UNANOTORIZED_USER')
      const productId = req.params.id
      await ProductModel.updateOne({ _id: productId }, { isRemove: true })
      res.json(true)
    } catch (e) {
      res.status(404).json({ e })
    }
  }
}
