import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { FaMoneyBillWave, FaGooglePay, FaCreditCard, FaUniversity } from "react-icons/fa";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("cod"); 
  const [orderPlaced, setOrderPlaced] = useState(false); // track order

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(updatedCart);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || 0) * (item.quantity || 1),
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const currency = cartItems.length > 0 ? cartItems[0].currency : "INR";

  
  const paymentIcons = {
    cod: <FaMoneyBillWave className="inline text-green-500" />,
    upi: <FaGooglePay className="inline text-blue-500" />,
    card: <FaCreditCard className="inline text-purple-500" />,
    netbanking: <FaUniversity className="inline text-orange-500" />,
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setOrderPlaced(true); 
      setTimeout(() => {
    setOrderPlaced(false);
  }, 2000);
};
  

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto mt-6 bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-center mt-6">
            No items in cart 🚀
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColorIndex}`}
                className="flex justify-between border p-2 rounded bg-gray-50 dark:bg-gray-700"
              >
                <div>
                  <p className="font-semibold">
                    {index + 1}. {item.name}
                  </p>
                  {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                  {item.selectedColorIndex !== undefined && item.colors && (
                    <p>Color: {item.colors[item.selectedColorIndex]}</p>
                  )}
                  <p>Qty: {item.quantity || 1}</p>
                </div>
                <p>
                  {item.currency} {(item.discountPrice || 0) * (item.quantity || 1)}
                </p>
              </div>
            ))}

            <div className="mt-4 p-4 border-t font-bold text-lg space-y-1">
              <p>Total Items: {totalItems}</p>
              <p>Total Payable: {currency} {totalPrice}</p>
            </div>

            <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-700">
              <h3 className="text-lg font-semibold mb-3">Choose Payment Method</h3>
              <div className="space-y-3">
                {["cod", "upi", "card", "netbanking"].map((method) => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={selectedPayment === method}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                    />
                    {paymentIcons[method]}
                    <span>
                      {method === "cod"
                        ? "Cash on Delivery"
                        : method === "upi"
                        ? "UPI / Google Pay / PhonePe"
                        : method === "card"
                        ? "Credit / Debit Card"
                        : "Net Banking"}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
              >
                Place Order
              </button>
            </div>

            
      {orderPlaced && (
  <div className="fixed top-11 right-20 transform mt-8 -translate-x-1 z-50 p-4 bg-green-100 border border-green-400 rounded-lg text-green-800 shadow-lg transition-all">
    ✅ Order placed successfully!
    <p>Items: {totalItems}</p>
    <p>Amount: {currency} {totalPrice}</p>
    <p>Payment Method: {paymentIcons[selectedPayment]} {selectedPayment.toUpperCase()}</p>
  </div>
)}

          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
