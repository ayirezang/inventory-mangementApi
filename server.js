import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";
dotenv.config();
const server = express();
server.use(cors());     
//middlewara
express.json();
  
server.use(productRoutes);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
