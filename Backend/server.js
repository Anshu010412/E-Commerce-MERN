import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes); //for user authentication
app.use("/api/products", productRoutes); //for product related admin

app.get("/", (req, res) => {
  res.send("API is Running");
});

connectDB();

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
