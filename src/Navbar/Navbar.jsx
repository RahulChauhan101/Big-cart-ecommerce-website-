import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import DarkModeToggle from "../components/DarkModeToggle";
import { useSelector } from "react-redux";
import { supabase } from "../supabaseClient";

const Navbar = ({ onSearch, session }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

useEffect(() => {
  const fetchUser = async () => {
    try {
      // Always check the current session first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session fetch error:", sessionError);
        return;
      }

      if (!session) {
        console.warn("No active session found");
        setUser(null);
        setFullName("");
        setAvatarUrl("");
        return; // stop execution — user not logged in
      }

      // Now safe to get user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("User fetch error:", userError);
        return;
      }

      setUser(user);
      console.log("User data:", user);
      
      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from("profiles") 
        .select("full_name, avatar_url")
        .eq("user_id", user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        setFullName("");
        setAvatarUrl("");
      } else {
        setFullName(profile?.full_name || "");
        setAvatarUrl(profile?.avatar_url || "");
      }

    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  fetchUser();

  // Optional: Listen for auth changes (login/logout)
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!session) {
      setUser(null);
      setFullName("");
      setAvatarUrl("");
    } else {
      fetchUser();
    }
  });

  return () => {
    listener?.subscription.unsubscribe();
  };
}, []);


  const handleSearchClick = () => {
    setClicked(true);
    if (typeof onSearch === "function") onSearch(input);
    setTimeout(() => setClicked(false), 100);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const UserInfo = () =>
    user ? (
      <div className="flex items-center gap-3 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">
        <img
          src={avatarUrl || "https://via.placeholder.com/32"}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">{fullName || "User"}</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300">{user.email}</p>
        </div>
      </div>
    ) : null;

  return (
    <nav className="p-4 shadow-md sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj6WNrw6o1eh0Z84fAxIO0M-RMMoN1W3aeQ&s"
            alt="Big Cart"
            className="h-10 w-15 object-contain rounded-md"
          />
          <span className="font-bold text-lg text-gray-900 dark:text-white p-1.5 rounded-lg">
            <span className="text-red-500">B</span>ig <span className="text-red-500">C</span>art
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <input
            type="text"
            placeholder="Search products..."
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
            <Link to="/" className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-green-500 rounded-md transition-all">
              <AiOutlineHome /> Home
            </Link>

            <Link to="/cart" className="relative flex items-center gap-1 px-3 py-2 hover:underline hover:bg-orange-500 rounded-md transition-all">
              <FiShoppingCart /> Cart
              {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
            </Link>

            <Link to="/checkout" className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-700 rounded-md transition-all">
              <FiShoppingCart /> Checkout
            </Link>

            <Link to="/productList" className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 rounded-md transition-all">
              <FiShoppingCart /> Products
            </Link>

            <UserInfo />

            {!session ? (
              <Link to="/auth" className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 rounded-md transition-all">
                <IoIosLogIn /> Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 rounded-md transition-all">
                <IoIosLogOut /> Logout
              </button>
            )}

            <DarkModeToggle />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 bg-gray-100 dark:bg-gray-900 p-2 rounded transition-colors duration-300">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-green-400 rounded-md">
            <AiOutlineHome /> Home
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative flex items-center gap-1 px-3 py-2 hover:underline hover:bg-orange-400 rounded-md">
            <FiShoppingCart /> Cart
            {cartCount > 0 && <span className="absolute top-0 left-14 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
          </Link>

          <Link to="/checkout" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 rounded-md">
            <FiShoppingCart /> Checkout
          </Link>

          <Link to="/productList" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 rounded-md">
            <FiShoppingCart /> Products
          </Link>

          <UserInfo />

          {!session ? (
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 rounded-md">
              <IoIosLogIn /> Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-2 hover:underline hover:bg-blue-400 rounded-md">
              <IoIosLogOut /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
