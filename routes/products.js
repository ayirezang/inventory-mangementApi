import express from "express";

import {
  getLowStockProducts,
  getAllProducts,
  updateProduct,
  createProduct,
  getProductById,
} from "../controllers/products.js";
const router = express.Router();

//create a product
router.get("/low-stock", getLowStockProducts);
router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.patch("/products/:id/stock", updateProduct);

router.get("/products/:id", getProductById);

export default router;
