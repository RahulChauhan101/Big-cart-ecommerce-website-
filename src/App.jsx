import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Navbar/Page/Home";
import CheckoutPage from "./Navbar/Page/CheckoutPage"
import Cart from "./Navbar/Page/Cart";

function App() {
  
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout " element={<CheckoutPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
