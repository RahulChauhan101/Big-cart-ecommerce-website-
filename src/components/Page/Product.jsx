import React, { useState } from "react";
import { data } from "../../data/data";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducer/cartReducer";
import Navbar from "../../Navbar/Navbar";

const Product = () => {
  const { id } = useParams();
  const product = data.products.find((p) => p.id == id);
  const dispatch = useDispatch();
    const [message, setMessage] = useState("");

  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  if (!product) return <p className="p-4">Product not found</p>;

  const handleColorClick = (id, idx) => {
    setSelectedColors({ ...selectedColors, [id]: idx });
  };

  const handleSizeClick = (id, size) => {
    setSelectedSizes({ ...selectedSizes, [id]: size });
  };

const handleAddToCart = () => {
  const selectedColorIndex = selectedColors[product.id] || 0;
  const selectedSize = selectedSizes[product.id] || null;
  const selectedImage =
    product.images && product.images[selectedColorIndex]
      ? product.images[selectedColorIndex]
      : product.images[0];

  dispatch(
    addToCart({
      ...product,
      quantity: 1,
      selectedColorIndex,
      selectedSize,
      selectedImage,
    })
  );

  setMessage(
    `${product.name} (Color: ${
      selectedColors[product.id] !== undefined
        ? product.colors[selectedColors[product.id]]
        : "default"
    }, Size: ${selectedSizes[product.id] || "default"}) added to cart!`
  );

  setTimeout(() => setMessage(""), 2000);
};


  return (
    <>
      {/* <Navbar /> */}
      <Navbar/>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex justify-center">
        <div className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-80 p-5 md:h-full object-cover rounded-l-xl"
            />
          </div>

          <div className="md:w-1/2 p-6 space-y-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                <strong>Category:</strong> {product.category} |{" "}
                <strong>Brand:</strong> {product.brand}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="line-through text-red-500 dark:text-gray-500">
                  MRP: {product.price}₹
                </span>
                <span className="text-blue-400 font-semibold">
                  Discount: {product.discountPrice}₹
                </span>
                <span className="text-green-500 font-bold">
                  BigCart: {product.BigCart}₹
                </span>
              </div>

              {product.colors && (
                <div className="mt-2">
                  <strong>Colors:</strong>{" "}
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleColorClick(product.id, idx)}
                      className={`inline-block mr-2 mt-1 px-2 py-1 border rounded cursor-pointer ${
                        selectedColors[product.id] === idx
                          ? "border-2 border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              )}

              {product.sizes && (
                <div className="mt-2">
                  <strong>Sizes:</strong>{" "}
                  {product.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSizeClick(product.id, size)}
                      className={`inline-block mr-2 mt-1 px-2 py-1 border rounded cursor-pointer ${
                        selectedSizes[product.id] === size
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Description:</strong> {product.description}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-4 md:mt-0"
            >
              Add to Cart
            </button>
          </div>
        </div>
                {message && (
          <div className="fixed top-11 right-20 transform mt-8 -translate-x-1 z-50 p-4 bg-orange-100 border border-green-400 rounded-lg text-purple-800 shadow-lg transition-all">
            {message}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
