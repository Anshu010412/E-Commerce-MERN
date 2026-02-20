import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [cart, setCart] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    // get cart item by user id
    api.get(`/cart/${userId}`).then((res) => setCart(res.data.cart));
    // get address by user id
    api.get(`/address/${userId}`).then((res) => {
      setAddress(res.data);
      setSelectAddress(res.data[0]); //default to fisrt address
    });
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

  const placeOrder = async () => {
    if (!selectAddress) {
      alert("Please select an address");
      return;
    }

    try {
      const response = await api.post("/order/place", {
        userId,
        address: selectAddress,
      });
      navigate(`/order-success/${response.data.orderId}`);
    } catch (err) {
      console.error("Order failed", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <h2 className="font-semibold mb-2 text-lg">Select Address</h2>
      {address.map((add) => (
        <div
          key={add._id}
          className="border p-3 rounded mb-2 flex justify-between items-start"
        >
          <label className="cursor-pointer flex-1">
            <input
              type="radio"
              name="address"
              onChange={() => setSelectAddress(add)}
              checked={selectAddress?._id === add._id}
              className="mr-2"
            />

            <strong>{add.fullName}</strong>
            <p className="text-sm">
              {add.addressLine}, {add.city}, {add.state} - {add.pincode}
            </p>
            <p className="text-sm">{add.phone}</p>
          </label>

          <button
            onClick={() => deleteAddress(add._id)}
            className="text-red-500 text-xs ml-2">
            ❌
          </button>
        </div>
      ))}
      <h2 className="font-semibold mb-2">Order Summary</h2>
      <p>Total Amount: ₹{total}</p>

      <button onClick={placeOrder} className="mt-4 w-full bg-green-500 font-semibold text-black p-2 rounded">
        Place Order
      </button>
    </div>
  );
}
