import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import DarkModeToggle from "../components/DarkModeToggle";

const Navbar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleSearchClick = () => {
    setClicked(true);
    if (typeof onSearch === "function") onSearch(input);
    setTimeout(() => setClicked(false), 100);
  };

  
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = storedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <nav className="p-4 shadow-md sticky top-0 z-50 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj6WNrw6o1eh0Z84fAxIO0M-RMMoN1W3aeQ&s"
            alt="Big Cart"
            className="h-10 w-15 object-contain rounded-md"
          />
          <span className="font-bold text-lg text-gray-900 dark:bg-white p-1.5 rounded-lg">
            <span className="text-red-500">B</span>ig{" "}
            <span className="text-red-500">C</span>art
          </span>
        </Link>

        
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <input
            type="text"
            placeholder="Search products or categories..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handleSearchClick}
            className={`px-4 py-2 rounded border transition ${
              clicked
                ? "bg-green-700 text-white border-green-700"
                : "bg-red-500 text-white border-red-500 hover:bg-red-600 dark:bg-red-700 dark:border-red-700 dark:hover:bg-red-800"
            }`}
          >
            Search
          </button>

          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1 hover:underline hover:bg-green-400 px-3 py-2 hover:rounded-md hover:text-white transition-all dark:text-white"
            >
              <AiOutlineHome /> Home
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center gap-1 hover:underline hover:bg-orange-400 px-3 py-2 hover:rounded-md hover:text-white transition-all dark:text-white"
            >
              <FiShoppingCart /> Cart
          
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/checkout"
              className="flex items-center gap-1 hover:underline hover:bg-blue-400 px-3 py-2 hover:rounded-md hover:text-white transition-all dark:text-white"
            >
              <FiShoppingCart /> Checkout
            </Link>

            <DarkModeToggle />
          </div>
        </div>

        
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 bg-gray-100 dark:bg-gray-900 p-2 rounded transition-colors duration-300">
          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-green-400 hover:rounded-md hover:text-white transition-all dark:text-white"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineHome /> Home
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-1 px-3 py-2 hover:underline hover:bg-orange-400 hover:rounded-md hover:text-white transition-all dark:text-white"
            onClick={() => setMenuOpen(false)}
          >
            <FiShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="absolute top-0 left-14 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/checkout"
            className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 hover:rounded-md hover:text-white transition-all dark:text-white"
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
