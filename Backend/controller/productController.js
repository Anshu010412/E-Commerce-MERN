import Product from "../model/productModel.js";

//Create a new product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      message: "Product Created successfullly",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "server Error", error: err.message });
  }
};

//Get All Product
export const getProduct = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }
    {/*Apply Searching and sorting*/}
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

//Update a Product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Product Updated Successfully", updated });
  } catch (err) {
    res.status(500).json({ message: "server Error", error: err.message });
  }
};

//Delete a Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Delete Successfully" });
  } catch (err) {
    res.status({ message: "server Error", error: err.message });
  }
};
