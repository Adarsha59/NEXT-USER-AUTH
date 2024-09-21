"use client";

import { useState } from "react";

export default function Form() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (response.ok) {
      setSuccess("Registration successful!");
      setError(null);
    } else {
      const errorData = await response.json();
      setError(errorData.message || "Registration failed.");
      setSuccess(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <input
        name="username"
        className="border border-black text-black"
        type="text"
        placeholder="Username"
        required
      />
      <input
        name="email"
        className="border border-black text-black"
        type="email"
        placeholder="Email"
        required
      />
      <input
        name="password"
        className="border border-black text-black"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit" className="mt-2">
        Register
      </button>
    </form>
  );
}
