import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import {
  FaMoneyBillWave,
  FaGooglePay,
  FaCreditCard,
  FaPiggyBank,
  FaUniversity,
} from "react-icons/fa";
import { SiPhonepe } from "react-icons/si";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculations
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + ((item.price || 0) - (item.discountPrice || 0)) * (item.quantity || 1),
    0
  );

  const totalBigCart = cartItems.reduce(
    (sum, item) => sum + (item.BigCart || 0) * (item.quantity || 1),
    0
  );

  const totalDiscountprice = totalMRP - totalBigCart; 
  const totalPrice = totalBigCart; // final price to pay

  const currency = cartItems.length > 0 ? cartItems[0].currency : "INR";

  // Payment icons
  const paymentIcons = {
    cod: <FaMoneyBillWave className="inline text-green-500" />,
    upi: (
      <span className="flex gap-3 items-center">
        <FaGooglePay className="text-blue-500" />
        <SiPhonepe className="text-[#5F259F] border p-1 border-gray-400 rounded-xl" />
      </span>
    ),
    card: <FaCreditCard className="inline text-purple-500" />,
    netbanking: <FaUniversity className="inline text-orange-500" />,
  };

  // Handle order
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000); // modal disappears after 3s
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="p-6 max-w-3xl mx-auto mt-6 bg-slate-400 dark:bg-gray-800 text-black dark:text-white min-h-screen rounded-lg shadow-lg">
        <div className="flex items-center justify-center pb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj6WNrw6o1eh0Z84fAxIO0M-RMMoN1W3aeQ&s"
            alt="Big Cart"
            className="h-10 w-15 object-contain rounded-md"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-center mt-6">
            No items in cart
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => {
              const color =
                item.colors && item.selectedColorIndex !== undefined
                  ? item.colors[item.selectedColorIndex]
                  : null;

              return (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColorIndex}`}
                  className="flex items-start gap-4 border p-4 rounded bg-gray-50 dark:bg-gray-700"
                >
                  <img
                    src={item.selectedImage || item.images[0]}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-lg mb-2">
                      {index + 1}. {item.name}
                    </p>

                    <div className="flex gap-6 text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                      {color && (
                        <p className="flex items-center gap-2">
                          Color:
                          <span
                            className="inline-block w-6 h-6 rounded-full border border-gray-400"
                            style={{ backgroundColor: color }}
                            title={color}
                          ></span>
                          <span className="text-sm">({color})</span>
                        </p>
                      )}
                      <p>Qty: {item.quantity || 1}</p>
                    </div>

                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">MRP:</span> {currency}{" "}
                        {(item.price || 0) * (item.quantity || 1)}
                      </p>
                      <p>
                        <span className="font-medium">Discount Price:</span> {currency}{" "}
                        {(item.discountPrice || 0) * (item.quantity || 1)}
                      </p>
                      {item.BigCart && (
                        <p>
                          <span className="font-medium">BigCart Price:</span> {currency}{" "}
                          {(item.BigCart || 0) * (item.quantity || 1)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Total */}
            <div className="mt-4 p-4 border-t font-bold text-lg space-y-1 bg-gray-100 dark:bg-gray-800 rounded">
              <p>Total Items: {totalItems}</p>
              <p>Total MRP: {currency} {totalMRP}</p>
              <p className="flex items-center gap-3 text-green-500">
                Total SAVE(Discount)<FaPiggyBank />: {currency} {totalDiscountprice}
              </p>
              <p>Total BigCart: {currency} {totalBigCart}</p>
            </div>

            {/* Payment Method */}
            <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-700">
              <h3 className="text-lg font-semibold mb-3">Choose Payment Method</h3>
              <div className="space-y-3">
                {["cod", "upi", "card", "netbanking"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-3 cursor-pointer"
                  >
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

            {/* Order placed modal */}
            {orderPlaced && (
              <div className="fixed top-20 right-10 z-50 p-4 bg-green-100 border border-green-400 rounded-lg text-green-800 shadow-lg transition-all">
                ✅ Order placed successfully!
                <p>Items: {totalItems}</p>
                <p>Amount: {currency} {totalPrice}</p>
                <p>
                  Payment Method: {paymentIcons[selectedPayment]}{" "}
                  {selectedPayment.toUpperCase()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
