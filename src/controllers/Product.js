import { CreatePoductDto } from "../domain/dtos/Product/product-create.dto.js";
import { ProductEntity } from "../domain/entities/Products.js";
import { ProductModel } from "../models/Product.js";

export class ProductController{
  constructor(){}
  productCreate = async(req,res) => {
    try {
      const [err, createProductDto] = await CreatePoductDto.createProduct(req.body)
      if(err) throw new Error(`${err}`)
      const createProduct = await new ProductModel(createProductDto).save()
      res.json(ProductEntity.fromObject(createProduct))
    } catch (e) {
      res.status(404).json(e.message)
    }
  }
}