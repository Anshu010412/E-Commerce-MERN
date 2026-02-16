import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) return;

      const response = await api.get(`/cart/${userId}`);
      const total = response.data.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      setCartCount(total);
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between p-4 shadow bg-white">
      <Link to="/" className="font-bold text-xl">
        UrbanMart
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/cart" className="relative text-xl">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-xl shadow-md px-1 text-xs">
              {cartCount}
            </span>
          )}
        </Link>

        {/*if user id not found*/}
        {!userId ? (
          <>
            <Link to="/login" className="text-lg">
              Login
            </Link>
            <Link to="/signup" className="text-lg">
              SignUp
            </Link>
          </>
        ) : (
          <button onClick={logout} className="text-lg">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
