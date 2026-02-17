import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);

  //load cart data
  const loadCart = async () => {
    if (!userId) return;

    try {
      const response = await api.get(`/cart/${userId}`);
      setCart(response.data.cart || response.data || { items: [] });
    } catch (err) {
      console.error("Failed to load cart", err);
      setCart({ items: [] });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCart();
  }, [userId]);

  //remove cart item
  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  //update item quantity
  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }

    try {
      await api.post("/cart/update", { userId, productId, quantity });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  //clearAll item from cart
  const clearCart = async () => {
  if (!userId) return;

  try {
    await api.post("/cart/clear", { userId });
    setCart({ items: [] });
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error("Failed to clear cart", err);
  }
};

  if (!cart) {
    return <div>Loading...</div>;
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>
      {cart.items.length === 0 ? (
        <div className="text-center text-gray-500">Your Cart is Empty.</div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={clearCart}
              className="text-sm text-red-400 font-semibold border border-black px-3 py-1 rounded">
              Remove All
            </button>
          </div>

          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex flex-col sm:flex-row items-center sm:justify-between p-4 border rounded"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="w-20 h-20 sm:w-16 sm:h-16 object-contain rounded mx-auto sm:mx-0"
                />

                <div className="text-center sm:text-left">
                  <h2 className="text-lg sm:text-base font-semibold">
                    {item.productId.title}
                  </h2>
                  <p className="text-gray-600">
                    ₹{item.productId.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center mt-2 sm:mt-0">
                {/*for decrease item*/}
                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  {" "}
                  -{" "}
                </button>

                {/*for Show Quantity*/}
                <span>{item.quantity}</span>

                {/*for increase item*/}
                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  {" "}
                  +{" "}
                </button>
              </div>

              <div>
                <p className="mt-2 sm:mt-0 text-center sm:text-right font-semibold">
                  ₹{(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.productId._id)}
                className="text-red-500 mt-2 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <h2 className="text-xl sm:text-2xl font-bold">
              Total:₹{total.toFixed(2)}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
