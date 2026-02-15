import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/products/update/${id}`, form);
    alert("Product Updated Successfully");
    navigate("/admin/products");
  };

  const loadProduct = async () => {
    const response = await api.get("/products");
    const product = response.data.find((p) => p.id === parseInt(id));
    if (product) {
      setForm(product);
    }
  };

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-25 bg-white pt-8 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Edit Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        {allowedFields.map(
          (key) =>
            allowedFields.includes(key) && (
              <input
                key={key}
                name={key}
                value={form[key] || ""}
                onChange={handleChange}
                placeholder={key}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"
              />
            ),
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Edit products
        </button>
      </form>
    </div>
  );
}
