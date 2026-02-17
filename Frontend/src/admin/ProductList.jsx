import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  //get products
  const loadProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, []);

  //delete products
  const deletedProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully");
      loadProducts();
    } catch (err) {
      console.log("Error deleting product", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-8 ">
        <h2 className="text-2xl font-bold text-center">
          Product List
        </h2>
        <Link
          to="/admin/products/add"
          className="bg-green-500 text-gray-900 px-4 py-2 rounded hover:bg-green-400">
          Add New Product
        </Link>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">Price</th>
            <th className="border border-gray-200 px-4 py-2">Stock</th>
            <th className="border border-gray-200 px-4 py-2">Category</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="border border-gray-200 px-4 py-2">
                {product.title}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {product.price}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {product.stock}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {product.category}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <Link
                  to={`/admin/products/edit/${product._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-5 hover:bg-blue-600">
                  Edit
                </Link>
                <button
                  onClick={() => deletedProduct(product._id)}
                  className="text-red-500 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
