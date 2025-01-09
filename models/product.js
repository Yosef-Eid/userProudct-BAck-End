import Joi from "joi";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  img: { type: String,},
  title: {
    type: String,
    minlength: 3,
    maxlength: 100,
    trim: true,
    required: true
  },
  price: {
    type: String,
    minlength: 1,
    maxlength: 100,
    trim: true,
    required: true
  },
  category: {
    type: String,
    minlength: 3,
    maxlength: 100,
    trim: true,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', }
}, { timestamps: true })

// validate Create Product
export function validateCreateProduct(create) {
  const validateProduct = Joi.object({
    title: Joi.string().min(3).max(100).trim().required(),
    price: Joi.string().min(1).max(100).trim().required(),
    category: Joi.string().min(3).max(100).trim().required(),
    user: Joi.string().trim()
  })

  return validateProduct.validate(create)
}

// validate update Product
export function validateUpdateProduct(update) {
  const validateProduct = Joi.object({
    title: Joi.string().min(3).max(100).trim(),
    price: Joi.string().min(1).max(100).trim(),
    category: Joi.string().min(3).max(100).trim(),
  })

  return validateProduct.validate(update)
}

export const Product = mongoose.model('addProduct', productSchema)
