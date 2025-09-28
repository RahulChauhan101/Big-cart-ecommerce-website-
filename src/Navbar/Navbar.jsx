import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleSearchClick = () => {
    setClicked(true);
    if (typeof onSearch === "function") {
      onSearch(input);
    } else {
      console.warn("onSearch is not defined");
    }
    setTimeout(() => setClicked(false), 100);
  };

  return (
    <nav className="bg-amber-50 p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
      
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj6WNrw6o1eh0Z84fAxIO0M-RMMoN1W3aeQ&s"
            alt="Big Cart"
            className="h-10 w-15 object-contain rounded-md"
          />
          <span className="font-bold text-lg">
            <span className="text-red-500">B</span>ig{" "}
            <span className="text-red-500">C</span>art
          </span>
        </Link>

        {/* Desktop Links + Search */}
        <div className="hidden md:flex items-center gap-4 flex-1 ml-10">
          <input
            type="text"
            placeholder="Search products or categories..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          />
          <button
            onClick={handleSearchClick}
            className={`px-4 py-2 rounded border transition ${
              clicked
                ? "bg-green-700 text-white border-green-700"
                : "bg-red-500 text-white border-red-500 hover:bg-red-600"
            }`}
          >
            Search
          </button>

          <Link
            to="/"
            className="flex items-center px-3 py-2 gap-1 hover:underline hover:bg-green-400 hover:rounded-md hover:text-white transition-all"
          >
            <AiOutlineHome /> Home
          </Link>
          <Link
            to="/cart"
            className="flex items-center px-3 py-2 gap-1 hover:underline hover:bg-orange-400 hover:rounded-md hover:text-white transition-all"
          >
            <FiShoppingCart /> Cart
          </Link>
          <Link
            to="/CheckoutPage"
            className="flex items-center px-3 py-2 gap-1 hover:underline hover:bg-blue-400 hover:rounded-md hover:text-white transition-all"
          >
            <FiShoppingCart /> Checkout
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Search products or categories..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500"
          />
          <button
            onClick={handleSearchClick}
            className={`px-4 py-2 rounded border transition w-full ${
              clicked
                ? "bg-green-700 text-white border-green-700"
                : "bg-red-500 text-white border-red-500 hover:bg-red-600"
            }`}
          >
            Search
          </button>

          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-green-400 hover:rounded-md hover:text-white transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineHome /> Home
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-orange-400 hover:rounded-md hover:text-white transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <FiShoppingCart /> Cart
          </Link>
          <Link
            to="/CheckoutPage"
            className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 hover:rounded-md hover:text-white transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <FiShoppingCart /> Checkout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
