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

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    if (typeof amount !== "number") {
      return res.status(400).json({ message: "Invalid amount" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $inc: { quantity: amount } },
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//low stock alert
export const getLowStockProducts = async (req, res) => {
  try {
    //check if threshold has been passed or use 10*/

    const threshold = Number(req.query.threshold) || 10;

    //query mongobd $lt

    const lowStockProductss = await Product.find({
      quantity: { $lt: threshold },
    });
    return res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
