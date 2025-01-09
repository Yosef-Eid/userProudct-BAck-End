import jwt from "jsonwebtoken";
import { Product } from "../models/product.js";

export async function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWt_SECRET_KEY);
      req.user = decoded;


      next();
    } catch (error) {
      res.status(401).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "token no found" });
  }
}

// verifyTokenAndAuthorization
export function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "you are not allowed" });
    }
  })

}

// verifyTokenAndAdmin
export function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "you are not allowed as admin" });
    }
  })

}


//  verify to products
export async function verifyProduct(req, res, next) {
  verifyToken(req, res, async () => {
    try {
      const productId = await Product.findById(req.params.id)
      if (!productId) { return res.status(404).json({ message: 'Product not found' }); }

      if (productId.user == req.user.id || req.user.isAdmin) { next() }
      else { return res.status(403).json({ message: "you are not allowed to modify this product" }); }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  })
}




