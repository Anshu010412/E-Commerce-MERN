import { useState } from "react";
import { useNavigate } from 'react-router';
import api from "../api/axios";

export default function Login() {
  //form data set and update through user
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //for sending message while error occur
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", form);

      //save token in localstorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      setMsg("Login Successfully");

      //navigate to home page after 1 second
      setTimeout(() => {
        navigate("/");
      }, 100);

      // clear inputs
      setForm({
        email: "",
        password: "",
      });
    } catch (err) {
      setMsg(err.response?.data?.message || "An Error occured");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 px-4 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center font-serif">
          Login
        </h2>
        {msg && (
          <div className="mb-4 text-center text-sm text-green-600 font-semibold">
            {msg}
          </div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <input
            name="email"
            autoComplete="new-email"
            placeholder="Enter your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"
            required />
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"
            required />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
