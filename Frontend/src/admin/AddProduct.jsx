import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //add product
      await api.post("/products/add", form);
      alert("product Added Successfully!");
      navigate("/admin/products");

      //clear inputs
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });
    } catch (err) {
      console.log("Error Adding Products", err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-25 bg-white pt-8 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center font-serif">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add products
        </button>
      </form>
    </div>
  );
}
