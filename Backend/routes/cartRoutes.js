import express from "express";
import {
  addToCart,
  removeItem,
  updateQuantity,
  getCart,
} from "../controller/cartController.js";

const router = express.Router();

//Add item to cart
router.post("/add", addToCart);

//remove item from cart
router.post("/remove", removeItem);

//update item quantity in cart
router.post("/update", updateQuantity);

//Get user's cart
router.get("/:userId", getCart);

export default router;
