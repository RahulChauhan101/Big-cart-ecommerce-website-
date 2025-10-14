import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../reducer/cartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id, selectedSize, selectedColorIndex) => {
    dispatch(removeFromCart({ id, selectedSize, selectedColorIndex }));
  };

  const handleUpdateQuantity = (id, selectedSize, selectedColorIndex, qty) => {
    dispatch(
      updateQuantity({ id, selectedSize, selectedColorIndex, quantity: qty })
    );
  };

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || 0) * (item.quantity || 1),
    0
  );
  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const totalBigCart = cartItems.reduce(
  (sum, item) => sum + (item.BigCart || 0) * (item.quantity || 1),
  0
);

  const totalDiscount = totalOriginalPrice - totalPrice;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar onSearch={() => {}} />
      <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-400 dark:text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4 dark:text-black">Cart</h2>
          {cartItems.length > 0 && (
            <button
              onClick={() => dispatch(clearCart())}
              className="h-9 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const color =
                item.colors && item.selectedColorIndex !== undefined
                  ? item.colors[item.selectedColorIndex]
                  : null;

              return (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColorIndex}`}
                  className="flex gap-4 border p-2 rounded items-center bg-white dark:bg-gray-800 shadow"
                >
                  <img
                    src={item.selectedImage || item.images[0]}
                    alt={item.name}
                    className=" border border-gray-400 ml-5 w-40 h-40 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.brand}</h3>
                    <h3 className="font-semibold">{item.name}</h3>

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

                    <p>
                      <strong>Rating:</strong> {item.ratings.average} ⭐ (
                      {item.ratings.count} reviews)
                    </p>
                    <p> MRP: {item.price} </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      DiscountPrice {item.currency} {item.discountPrice}
                    </p>
                    <p> BigCart: {item.BigCart}</p>

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
                      Sub Total: {item.currency}{" "}
                      {(item.BigCart || 0) * (item.quantity || 1)}
                    </p>
                    <p className="mt-2 font-semibold">
                      Product Total discount: {item.currency}{" "}
                      {(item.discountPrice || 0) * (item.quantity || 1)}
                    </p>

                    <button
                      onClick={() =>
                        handleRemove(
                          item.id,
                          item.selectedSize,
                          item.selectedColorIndex
                        )
                      }
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="mt-4 p-4 border-t font-bold text-lg bg-white dark:bg-gray-800 shadow rounded">
             <p>Total Items: {totalItems}</p>
  <p>Total MRP: ₹ {totalOriginalPrice}</p>
    <p>Total Save (Discounted): ₹ {totalPrice}</p>
  <p>Total Payable Amount: ₹ {totalBigCart}</p>


              <button
                onClick={handleCheckout}
                className="mt-4 w-100 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
