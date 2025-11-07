import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import Navbar from "./Navbar/Navbar";
import Home from "./components/Page/Home.jsx";
import Cart from "./components/Page/Cart.jsx";
import CheckoutPage from "./components/Page/CheckoutPage.jsx";
import ProductList from "./components/ProductList.jsx";
import Product from "./components/Page/Product.jsx";
import Auth from "./Auth.jsx";
import ProfileUpdate from "./ProfileUpdate.jsx";

function App() {
  const [session, setSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar onSearch={(term) => setSearchTerm(term)} session={session} />
      <Routes>
        {/* Auth Route: redirect to home if already logged in */}
        <Route
          path="/auth"
          element={session ? <Navigate to="/" /> : <Auth />}
        />

        {/* Main Routes */}
        {session && (
          <>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/profile" element={<ProfileUpdate user={session.user} />} />
          </>
        )}

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={session ? "/" : "/auth"} />} />
      </Routes>
    </Router>
  );
}

export default App;
