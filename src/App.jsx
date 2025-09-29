import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Navbar/Page/Home";
import Cart from "./Navbar/Page/Cart";
import CheckoutPage from "./Navbar/Page/CheckoutPage";
import Product from "./Navbar/Page/product";



function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<Product/>} />
      </Routes>
    </Router>
  );
}

export default App;
