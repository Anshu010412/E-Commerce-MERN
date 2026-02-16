import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const response = await api.get(
      `/products?search=${search}&category=${category}`,
    );
    setProducts(response.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
  const userId = localStorage.getItem("userId");
  if (!userId) return alert("Please login first");

  try {
    await api.post("/cart/add", { userId, productId });

    // Trigger the header to update cart count
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error("Failed to add to cart", err);
  }
};

  return (
    <div className="p-6 pt-8">
      {/*Search */}
      <div className="mb-4 flex gap-3">
        <input
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"
        />

        {/*Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Beauty">Beauty</option>
          <option value="Sports">Sports</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Mobiles">Mobiles</option>
        </select>
      </div>

      {/*product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl p-3 shadow hover:shadow-xl transition"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain bg-white rounded"
              />
              <h2 className="font-semibold text-lg mt-2">{product.title}</h2>
              <p className="text-gray-600">₹{product.price}</p>
            </Link>

            <button
              onClick={() => addToCart(product._id)}
              className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
              Add To Cart
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
