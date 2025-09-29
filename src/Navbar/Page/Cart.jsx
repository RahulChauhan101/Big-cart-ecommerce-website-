import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (id, selectedSize, selectedColorIndex) => {
    const updatedCart = cartItems.filter(
      (item) =>
        !(
          item.id === id &&
          item.selectedSize === selectedSize &&
          item.selectedColorIndex === selectedColorIndex
        )
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (id, selectedSize, selectedColorIndex, qty) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id &&
      item.selectedSize === selectedSize &&
      item.selectedColorIndex === selectedColorIndex
        ? { ...item, quantity: qty }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || 0) * (item.quantity || 1),
    0
  );
  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const totalDiscount = totalOriginalPrice - totalPrice;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar onSearch={(term) => {}} />
      <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColorIndex}`}
                className="flex gap-4 border p-2 rounded items-center bg-white dark:bg-gray-800 shadow"
              >
                <img
                  src={item.selectedImage || item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.brand}</h3>
                  <h3 className="font-semibold">{item.name}</h3>

                  {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                  {item.selectedColorIndex !== undefined && item.colors && (
                    <p>Color: {item.colors[item.selectedColorIndex]}</p>
                  )}

                  <p>
                    <strong>Rating:</strong> {item.ratings.average} ⭐ (
                    {item.ratings.count} reviews)
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.currency} {item.discountPrice}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.selectedSize,
                          item.selectedColorIndex,
                          Math.max((item.quantity || 1) - 1, 1)
                        )
                      }
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          item.selectedSize,
                          item.selectedColorIndex,
                          (item.quantity || 1) + 1
                        )
                      }
                      className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-2 font-semibold">
                    Subtotal: {item.currency} {(item.discountPrice || 0) * (item.quantity || 1)}
                  </p>

                  <button
                    onClick={() =>
                      handleRemove(item.id, item.selectedSize, item.selectedColorIndex)
                    }
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 p-4 border-t font-bold text-lg bg-white dark:bg-gray-800 shadow rounded">
              <p>Total Items: {totalItems}</p>
              <p>Total Discount: INR {totalDiscount}</p>
              <p>Total Price: INR {totalPrice}</p>

              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
