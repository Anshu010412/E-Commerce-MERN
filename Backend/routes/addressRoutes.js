import express from "express";
import { saveAddress, getAddresses ,deleteAddress } from "../controller/addressController.js";

const router = express.Router();

//route to saveAddress
router.post("/add", saveAddress);

//route to getAddresses
router.get("/:userId", getAddresses);

//route to deleteAddress
router.delete("/:addressId", deleteAddress);

export default router;
