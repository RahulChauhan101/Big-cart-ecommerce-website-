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

  // Cart Items
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Fetch User Profile
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
      {/* NAVBAR */}
      <nav className="p-4 shadow-md sticky top-0 z-50 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj6WNrw6o1eh0Z84fAxIO0M-RMMoN1W3aeQ&s"
              className="h-10 rounded-md"
            />
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              <span className="text-red-500">B</span>ig <span className="text-red-500">C</span>art
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 text-gray-900 dark:text-white">

            <Link to="/" className="hover:underline">Home</Link>

            <Link to="/cart" className="relative hover:underline">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/checkout" className="hover:underline">Checkout</Link>

            <Link to="/products" className="hover:underline">Products</Link>

            {/* PROFILE DESKTOP */}
            {user && (
              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <img
                  src={avatarUrl || "https://via.placeholder.com/40"}
                  className="w-10 h-10 rounded-full border-2 border-red-500 object-cover"
                />

                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">
                    {fullName}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {user.email}
                  </span>
                </div>
              </Link>
            )}

            {!user ? (
              <Link to="/auth" className="hover:underline">Login</Link>
            ) : (
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            )}

            {/* DESKTOP SEARCH */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search..."
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

        {/* MOBILE SEARCH */}
        <div className="md:hidden mt-3 sticky top-16 z-40 bg-gray-100 dark:bg-gray-900 p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search..."
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

      {/* MOBILE BOTTOM SHEET MENU */}
      <div
        className={`fixed bottom-0 left-0 w-full opacity-95
           bg-white dark:bg-gray-400 rounded-t-3xl shadow-xl z-50 p-6 transition-transform duration-300 ${


          

          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <AiOutlineClose
            size={26}
            className="text-gray-900 dark:text-white cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        {/* MOBILE PROFILE CARD */}
        {user && (
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-#b91a1a-300 dark:hover:bg-gray-600 transition mb-4"
          >
            <img
              src={avatarUrl || "https://via.placeholder.com/80"}
              className="w-14 h-14 rounded-full border-2 border-red-500 object-cover"
            />

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                {fullName}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {user.email}
              </span>
            </div>
          </Link>
        )}

        {/* MENU LINKS */}
        <div className="flex flex-col gap-3 text-gray-900 dark:text-white">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Home
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-lg px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Cart ({cartCount})
          </Link>

          <Link
            to="/checkout"
            onClick={() => setMenuOpen(false)}
            className="text-lg px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Checkout
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="text-lg px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Products
          </Link>

          {!user ? (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="text-lg px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <IoIosLogIn className="inline" /> Login
            </Link>
          ) : (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="text-lg text-left px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
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
