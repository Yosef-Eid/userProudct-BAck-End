import express from 'express';
const router = express.Router();

import {
  getAllProducts,
  getProductByID,
  createProduct,
  deleteProduct,
  editProduct,
  getAllProductsByAdmin,
} from '../controls/product.js';

import {
  verifyProduct,
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
} from '../middlewares/verify.js';

import { upload } from '../controls/upload.js';

router.get('/', verifyTokenAndAdmin, getAllProductsByAdmin)
router.get('/productUser', verifyToken, getAllProducts)
router.get('/productUserId/:id', verifyProduct, getProductByID)
router.post('/createProduct', verifyToken, upload.single('image'), createProduct)
router.put('/editProduct/:id', verifyProduct, editProduct)
router.delete('/deleteProduct/:id', verifyProduct, deleteProduct)

export default router