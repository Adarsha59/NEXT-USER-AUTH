"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

const HeroBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-light-blue-400 to-teal-400">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 20,
          }}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2380F'/%3E%3Cstop offset='1' stop-color='%23f40'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff10' cx='12' cy='12' r='2'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/\u003E%3Crect width='100%25' height='100%25' fill='url(%23b)'/\u003E%3C/svg%3E\")",
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white">
        <motion.h1
          className="text-6xl font-bold mb-4 text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          NEXTJS Auth
        </motion.h1>

        <motion.p
          className="text-xl mb-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Secure, Fast, and Easy Authentication
        </motion.p>

        <div
          className={`flex ${
            isMobile ? "flex-col" : "flex-row"
          } space-y-4 md:space-y-0 md:space-x-4`}
        >
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 transition-colors duration-300 flex items-center justify-center"
            >
              <FaLock className="mr-2" /> Login
            </motion.button>
          </Link>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-teal-400 to-green-400 hover:from-teal-500 hover:to-green-500 transition-colors duration-300 flex items-center justify-center"
            >
              <FaShieldAlt className="mr-2" /> Signup
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-white opacity-10 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default HeroBanner;
