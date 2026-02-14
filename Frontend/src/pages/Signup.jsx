import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
  //form data set and update through user
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  //for sending message while error occur
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message);

      // clear inputs
      setForm({
        name: "",
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
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center font-serif">
          Create Account
        </h2>
        {msg && (
          <div className="mb-4 text-center text-sm text-blue-600 font-semibold">
            {msg}
          </div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"
            required />
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
