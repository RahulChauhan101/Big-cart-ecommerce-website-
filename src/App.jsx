import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import Navbar from "./Navbar/Navbar";
import Home from "./Navbar/Page/Home";
import Cart from "./Navbar/Page/Cart";
import CheckoutPage from "./Navbar/Page/CheckoutPage";
import Product from "./Navbar/Page/Product";
import ProductList from "./components/ProductList";
import Auth from "./components/Auth"; // Your login/signup component

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // If not logged in, show Auth component
  if (!session) return <Auth />;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/productList" element={<ProductList />} />
        {/* Redirect any unknown route to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
