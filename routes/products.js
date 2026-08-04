import express from "express";
import Product from "../models/product.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  lowStockAlert,
  updateProductById,
} from "../controllers/products.js";
const router = express.Router();

//create a product
router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProductById);
router.delete("/products/:id", deleteProduct);
router.get("/low-stock", lowStockAlert);

export default router;
