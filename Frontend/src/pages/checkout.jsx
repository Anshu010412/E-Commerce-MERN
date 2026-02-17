import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Checkout() {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState([]);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // get cart item by user id
    api.get(`/cart/${userId}`).then((res) => setCart(res.data.cart));
    // get address by user id
    api.get(`/address/${userId}`).then((res) => setAddress(res.data));
  }, [userId]);

  //delete address from the list of addresses
  const deleteAddress = async (addressId) => {
    try {
      await api.delete(`/address/${addressId}`);
      setAddress((prev) => prev.filter((add) => add._id !== addressId));
    } catch (err) {
      console.error("Failed to delete address", err);
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
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <h2 className="font-semibold mb-2 text-lg">Select Address</h2>
      {address.map((add) => (
        <div
          key={add._id}
          className="border border-gray-300 rounded p-4 mb-4 flex justify-between items-start"
        >
          <div>
            <p>{add.fullName}</p>
            <p>{add.phone}</p>
            <p>{add.addressLine}</p>
            <p>
              {add.city}, {add.state} - {add.pincode}
            </p>
          </div>

          <button
            onClick={() => deleteAddress(add._id)}
            className="text-red-500 text-sm hover:underline">
            Delete
          </button>
        </div>
      ))}
      <h2 className="font-semibold mb-2">Order Summary</h2>
      <p>Total Amount: ₹{total}</p>

      <button className="mt-4 w-full bg-green-500 font-semibold text-black p-2 rounded">
        Place Order
      </button>
    </div>
  );
}
