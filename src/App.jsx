import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Navbar/Page/Home";
import Cart from "./Navbar/Page/Cart";
import CheckoutPage from "./Navbar/Page/CheckoutPage";
import Product from "./Navbar/Page/product";
import ProductList from "./components/ProductList";



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
