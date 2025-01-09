import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    minlength: 8,
    maxlength: 255,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export function validateRegister(user) {
  const validateUser = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().required(),
    password: passwordComplexity().required(),
  });

  return validateUser.validate(user);
}

export function validateLogin(user) {
  const validateUser = Joi.object({
    email: Joi.string().required(),
    password: passwordComplexity().required(),
  });

  return validateUser.validate(user);
}

export function validateChangePassword(user) {
  const validateUser = Joi.object({
    password: passwordComplexity().required(),
  });

  return validateUser.validate(user);
}

export function validateUpdateUser(user) {
  const validateUser = Joi.object({
    username: Joi.string().min(3).max(255),
    email: Joi.string().required(),
    password: passwordComplexity().required(),
  });

  return validateUser.validate(user);
}

const User = mongoose.model("User", userSchema);
export default User;
