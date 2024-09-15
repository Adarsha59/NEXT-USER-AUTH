"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data Submitted:", formData);
      await axios.post("http://localhost:3000/api/users/login", formData);
      toast.success("Login successful!"); // Changed from Signup to Login
      router.push("/profile");
    } catch (error) {
      toast.error("Login failed. Please try again."); // Changed to a more general error message
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="w-full max-w-md p-8 m-4 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-md backdrop-filter transition-all duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-white mb-8 animate-fade-in-down">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-transparent border-2 border-white rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-white text-opacity-80 transition-all duration-300 ease-in-out"
            >
              <FaUser className="inline mr-2" />
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 text-white bg-transparent border-2 border-white rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-white text-opacity-80 transition-all duration-300 ease-in-out"
            >
              <FaLock className="inline mr-2" />
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-2 text-white focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-white hover:text-blue-500 transition-colors duration-300 ease-in-out"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
