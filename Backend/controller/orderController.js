import Order from "../model/order.js";
import Cart from "../model/cart.js";
import Product from "../model/productModel.js";

//API's for place order export
export const PlaceOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    //get cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is Empty" });
    }

    //prepare order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    //calculate total Amount
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    //deduct stock from products
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    //create order
    const order = await Order.create({
      userId,
      items: orderItems,
      address,
      totalAmount,
      PaymentMethod: "COD",
    });

    //clear cart
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });
    res
      .status(201)
      .json({ message: "Order Placed Successfully", orderId: order._id });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};
