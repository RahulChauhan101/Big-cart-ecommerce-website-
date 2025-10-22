import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import Navbar from "../src/Navbar/Navbar";
import Home from "./components/Page/Home"
import Cart from "./components/Page/Cart";
import CheckoutPage from "./components/Page/CheckoutPage";
import ProductList from "./components/ProductList";
import Product from "./components/Page/product";
import Auth from "./components/Page/Auth";


// Main Application Component
    // Navbar with search functionality


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
