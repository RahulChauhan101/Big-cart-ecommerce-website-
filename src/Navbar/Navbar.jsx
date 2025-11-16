import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
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

  // Cart Items From Redux
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Fetch Logged-in User + Profile
  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session) {
        setUser(null);
        setFullName("");
        setAvatarUrl("");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const loggedUser = userData?.user;
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

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const UserInfo = () =>
    user ? (
      <Link
        to="/profile"
        className="flex items-center gap-3 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <img
          src={avatarUrl || "https://via.placeholder.com/40"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
        />

        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            {fullName || "User"}
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-300">{user.email}</p>
        </div>
      </Link>
    ) : null;

  return (
    <nav className="p-4 shadow-md sticky top-0 z-50 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj6WNrw6o1eh0Z84fAxIO0M-RMMoN1W3aeQ&s"
            className="h-10 rounded-md"
            alt="Big Cart"
          />
          <span className="font-bold text-lg text-gray-900 dark:text-white">
            <span className="text-red-500">B</span>ig{" "}
            <span className="text-red-500">C</span>art
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search products..."
            className="p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <button
            onClick={() => onSearch(input)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Search
          </button>

          <Link
            to="/"
            className="flex items-center gap-1 px-3 py-2 text-gray-900 dark:text-white hover:underline"
          >
            <AiOutlineHome /> Home
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1 px-3 py-2 text-gray-900 dark:text-white hover:underline"
          >
            <FiShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/checkout"
            className="flex items-center gap-1 px-3 py-2 text-gray-900 dark:text-white hover:underline"
          >
            Checkout
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-1 px-3 py-2 text-gray-900 dark:text-white hover:underline"
          >
            Products
          </Link>

          <UserInfo />

          {!user ? (
            <Link
              to="/auth"
              className="flex items-center gap-1 px-3 py-2 text-gray-900 dark:text-white hover:underline"
            >
              <IoIosLogIn /> Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 text-gray-900 dark:text-white hover:underline"
            >
              <IoIosLogOut /> Logout
            </button>
          )}

          <DarkModeToggle />
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden flex items-center gap-3">
          <DarkModeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <AiOutlineClose size={24} className="text-gray-900 dark:text-white" />
            ) : (
              <AiOutlineMenu size={24} className="text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
