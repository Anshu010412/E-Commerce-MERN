import express from "express";
import { saveAddress, getAddresses } from "../controller/addressController.js";

const router = express.Router();

//route to saveAddress
router.post("/add", saveAddress);

//route to getAddresses
router.get("/:userId", getAddresses);

export default router;
