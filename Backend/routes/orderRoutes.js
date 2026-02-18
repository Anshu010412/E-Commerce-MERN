import express from "express";
import {PlaceOrder} from "../controller/orderController.js";

const router = express.Router();

router.post("/place", PlaceOrder);

export default router;
