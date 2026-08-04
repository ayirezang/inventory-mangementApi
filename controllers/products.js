import Product from "../models/product.js";

//create a new product

export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, supplier, description } = req.body;
    const newProduct = new Product({
      name,
      price,
      quantity,
      supplier,
      description,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID

export const updateProductById = async (req, res) => {
  try {
    // Get the product ID from the request parameters
    const id = req.params.id;
    {
      /**extract the updated product data from the request body */
    }
    const updatedProductData = req.body;
    {
      /**update the product in the database */
    }
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    product.name = updatedProductData || product.name;
    product.price = updatedProductData.price || product.price;
    product.quantity = updatedProductData.quantity || product.quantity;
    product.supplier = updatedProductData.supplier || product.supplier;
    product.description = updatedProductData.description || product.description;
    {
      /**save the updated product */
    }
    const updatedProduct = await product.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    {
      /**find the product to delete */
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//low stock alert
export const lowStockAlert = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      quantity: { $lt: 10 },
    });
    res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
