import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart");
      return;
    }

    try {
      const response = await api.post("/cart/add", { userId, productId: id });
      if (response.data.cart) {
        const total = response.data.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        localStorage.setItem("cartCount", total);
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };
  const loadProduct = async () => {
    const response = await api.get("/products");
    const p = response.data.find((item) => item._id === id);
    setProduct(p);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-20 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-contain bg-white rounded p-5"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">₹{product.price}</p>
      <button
        onClick={addToCart}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800">
        Add To Cart
      </button>
    </div>
  );
}
