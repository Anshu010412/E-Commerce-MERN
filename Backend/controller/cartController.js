import Cart from "../model/cart.js";

//API's --Add item to Cart
export const addToCart = async (req, res) => {
  try {
    const [userId, productId] = req.body;
    {/*find cart item*/}
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, item: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find((i) => i.productId.toString() === productId);
    }

    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
    {/*Save cart */}
    await cart.save();
    res.json({ message: "Item Added To Cart", cart });
  } catch (err) {
    res.status(500).json({ message: "server Error", err });
  }
};

//API's --Remove item from Cart
export const removeItem = async (req, res) => {
  try {
    const [userId, productId] = req.body;
    {/*find user*/}
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not found" });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    {/*Save cart */}
    await cart.save();
    res.json({ message: "remove Cart Successfully", cart });
  } catch (err) {
    res.status(500).json({ message: "server Error", err });
  }
};

//API's --updateQuantity from Cart
export const updateQuantity = async (req, res) => {
  try {
    const [userId, productId, quantity] = req.body;
    {/*find user*/}
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not found" });
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      res.json({ message: "Item Not found in Cart" });
    }
    item.quantity = quantity;

    {/*Save cart */}
    await cart.save();
    res.json({ message: "Item Quantity Update", cart });
  } catch (err) {
    res.status(500).json({ message: "server Error", err });
  }
};
