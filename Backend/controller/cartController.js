import Cart from "../model/cart.js";

//API's --Add item to Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      // find product in existing cart
      const item = cart.items.find((i) => i.productId.toString() === productId);

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    await cart.populate("items.productId");
    res.json({ message: "Item added", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

//API's --Remove item from Cart
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    {
      /*find user by Id*/
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );
    {
      /*Save cart */
    }
    await cart.save();
    res.json({ message: "Remove Cart Successfully", cart });
  } catch (err) {
    res.status(500).json({ message: "server Error", err });
  }
};

//API's --updateQuantity from Cart
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    {
      /*find user by Id*/
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not found" });
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      res.json({ message: "Item Not found in Cart" });
    }
    item.quantity = quantity;
    {
      /*Save cart */
    }
    await cart.save();
    res.json({ message: "Item Quantity Update", cart });
  } catch (err) {
    res.status(500).json({ message: "server Error", err });
  }
};

//get cart by user ID
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    {
      /*find user by Id */
    }
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: "server Error", err });
  }
};
