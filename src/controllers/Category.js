import { CategoryModel } from "../models/Category"

export const categoryCreate = async (req,res) =>{
  try {
    const { categoryName, isAvaliable, userId } = req.body
    if(!categoryName) throw new Error('REQUERIED_FIELD')
    if(!userId) throw new Error('REQUIRED_USER')
    const createCAtegory = new CategoryModel({
      categoryName,

  })
    res.json({ok: 'ok'})
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}