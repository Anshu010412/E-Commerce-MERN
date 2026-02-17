import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    try {
      await api.post("/address/add", {
        ...form,
        userId,
      });
      navigate("/checkout");
    } catch (error) {
      console.error("Failed to save address", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-20">
      <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>

      {/*Dynamic Input from Backend*/}
      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          onChange={handleChange}
          className="w-full p-2 border mb-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"/>
      ))}
      <button
        onClick={saveAddress}
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >Save Address</button>
    </div>
  );
}
