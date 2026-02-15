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

  return (
    <div className="p-6 ">
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
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="border rounded p-3 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain bg-white rounded"
            />
            <h2 className="font-semibold text-lg mt-2">{product.title}</h2>
            <p className="text-gray-600">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
