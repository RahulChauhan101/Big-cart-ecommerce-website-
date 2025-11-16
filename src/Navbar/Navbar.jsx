import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import DarkModeToggle from "../components/DarkModeToggle";
import { useSelector } from "react-redux";
import { supabase } from "../supabaseClient";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Cart total items
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const session = (await supabase.auth.getSession()).data.session;

      if (!session) {
        setUser(null);
        return;
      }

      const { data } = await supabase.auth.getUser();
      const loggedUser = data?.user;
      setUser(loggedUser);

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("user_id", loggedUser.id)
        .single();

      setFullName(profile?.full_name || "");
      setAvatarUrl(profile?.avatar_url || "");
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <>
      {/* NAVBAR TOP */}
      <nav className="p-4 shadow-md sticky top-0 z-50 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj6WNrw6o1eh0Z84fAxIO0M-RMMoN1W3aeQ&s"
              className="h-10 rounded-md"
            />
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              <span className="text-red-500">B</span>ig
              <span className="text-red-500">C</span>art
            </span>
          </Link>

          {/* DESKTOP ONLY */}
          <div className="hidden md:flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search products..."
              className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              onClick={() => onSearch(input)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Search
            </button>
            <DarkModeToggle />
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center gap-3">
            <DarkModeToggle />
            <AiOutlineMenu
              size={28}
              className="text-gray-900 dark:text-white"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>

        {/* STICKY MOBILE SEARCH BAR */}
        <div className="md:hidden mt-3 sticky top-16 z-40 bg-gray-100 dark:bg-gray-900 p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            onClick={() => onSearch(input)}
            className="mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Search
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* BOTTOM SHEET MENU (Meesho Style) */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 rounded-t-3xl shadow-xl z-50 p-6 transition-transform duration-300 ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* CLOSE BUTTON */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          <AiOutlineClose
            size={26}
            className="text-gray-900 dark:text-white cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* MENU LIST */}
        <div className="flex flex-col gap-4 text-gray-900 dark:text-white">

          <Link to="/" onClick={() => setMenuOpen(false)} className="text-lg">
            <AiOutlineHome className="inline" /> Home
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-lg">
            <FiShoppingCart className="inline" /> Cart ({cartCount})
          </Link>

          <Link to="/checkout" onClick={() => setMenuOpen(false)} className="text-lg">
            Checkout
          </Link>

          <Link to="/products" onClick={() => setMenuOpen(false)} className="text-lg">
            Products
          </Link>

          {/* USER PROFILE */}
          {user && (
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 mt-2 bg-gray-200 dark:bg-gray-700 p-3 rounded-xl"
            >
              <img
                src={avatarUrl || "https://via.placeholder.com/40"}
                className="w-12 h-12 rounded-full border-2 border-red-500 object-cover"
              />
              <div>
                <h3 className="font-semibold">{fullName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
              </div>
            </Link>
          )}

          {/* LOGIN & LOGOUT */}
          {!user ? (
            <Link
              to="/auth"
              className="text-lg"
              onClick={() => setMenuOpen(false)}
            >
              <IoIosLogIn className="inline" /> Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-lg text-left"
            >
              <IoIosLogOut className="inline" /> Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
