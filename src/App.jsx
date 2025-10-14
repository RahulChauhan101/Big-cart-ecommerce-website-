import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./components/Page/Home"
import Cart from "./components/Page/Cart";
import CheckoutPage from "./components/Page/CheckoutPage";
import Product from "./components/Page/product";
import ProductList from "./components/ProductList";


// Main Application Component
    // Navbar with search functionality


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/productList" element={<ProductList/>} />
      </Routes>
    </Router>
  );
}

export default App;
