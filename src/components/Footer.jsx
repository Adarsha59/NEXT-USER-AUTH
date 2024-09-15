"use client";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className=" bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Contact Us</h3>
            <p>123 Sky Avenue, Cloud City</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@skycompany.com</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-200 transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-2xl hover:text-blue-300 transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-blue-300 transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-blue-300 transition duration-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-blue-300 transition duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Newsletter</h3>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full sm:w-auto rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-r-md transition duration-300 mt-2 sm:mt-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-blue-400 flex flex-col sm:flex-row justify-between items-center">
          <p>© 2024 Sky Company. All rights reserved.</p>
          <p className="mt-4 sm:mt-0">Designed with ❤️ for the future</p>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-700 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition duration-300"
        aria-label="Scroll to top"
      >
        <IoIosArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
