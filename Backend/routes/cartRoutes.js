import express from "express";
import {
  addToCart,
  removeItem,
  updateQuantity,
  getCart,
  clearCart
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

//clear all item from cart
router.post("/clear" , clearCart);

export default router;
