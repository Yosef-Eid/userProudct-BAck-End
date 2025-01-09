
// Import the Product model from the models directory
import { Product, validateCreateProduct, validateUpdateProduct } from '../models/product.js';

// Controller to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    if (products.length == 0) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller to get all products
const getAllProductsByAdmin = async (req, res) => {
  const { minPrice, maxPrice } = req.query
  console.log(minPrice, maxPrice);

  let products;
  try {

    if (minPrice && maxPrice) {
      products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });
    } else {
      products = await Product.find();
    }

    if (products.length == 0) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a product by its ID
const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to create a new product
const createProduct = async (req, res) => {
  // validate product
  const { error } = validateCreateProduct(req.body)
  if (error) res.status(400).json({ message: error.message + "validate" });

  const { title, price, category } = req.body;
  try {
    // const existingProduct = await Product.findOne({ title, price, category });
    // if (existingProduct) {
    //   return res.status(400).json({ message: "This product is already available" });
    // }

    // upload image
    const imgPath = req.file ? `/images/${req.file.filename}` : null;
    const newProduct = new Product({
      title, price, category,
      user: req.user.id,
      img: imgPath
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to edit an existing product
const editProduct = async (req, res) => {
  // validate update product
  const { error } = validateUpdateProduct(req.body)
  if (error) res.status(400).json({ message: error.message });
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json({ message: "Product deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all the controller functions
export { getAllProductsByAdmin, getAllProducts, getProductByID, createProduct, editProduct, deleteProduct };
