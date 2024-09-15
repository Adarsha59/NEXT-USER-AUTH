"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const myData = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/users/me");
      console.log("User ID: " + res.data.data._id);
      setUserId(res.data.data._id);
      toast.success("User data fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await axios.get("http://localhost:3000/api/users/logout");
      console.log("Logged out");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Welcome
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={myData}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            {loading ? "Loading..." : "Fetch My Data"}
          </button>
          {userId && (
            <Link href={`/user/${userId}`}>
              <button className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
                View User Data
              </button>
            </Link>
          )}
          <button
            onClick={logOut}
            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
