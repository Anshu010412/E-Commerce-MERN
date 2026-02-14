import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

//route to create a product
router.post("/add", createProduct);

//route to get all product
router.get("/", getProduct);

//route to update a product
router.put("/update/:id", updateProduct);

//route to delete a product
router.delete("/delete/:id", deleteProduct);

export default router;
