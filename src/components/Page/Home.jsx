import React, { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { FaMale, FaFemale, FaChild } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { data } from "../../data/data"; // Import products & categories
import { addToCart } from "../../reducer/cartReducer";
import { useDispatch } from "react-redux";

const Home = ({ searchTerm }) => {
  const { categories, products } = data;
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [message, setMessage] = useState("");

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Men": return <FaMale className=" h-5  text-blue-500" />;
      case "Women": return <FaFemale className=" h-5 text-pink-500" />;
      case "Kids": return <FaChild className=" h-5 text-purple-500" />;
      default: return <AiOutlineShopping className="text-green-600" />;
    }
  };

  const handleCategoryClick = (name) => setSelectedCategory(name);
  const handleColorClick = (productId, index) =>
    setSelectedColors({ ...selectedColors, [productId]: index });
  const handleSizeClick = (productId, size) =>
    setSelectedSizes({ ...selectedSizes, [productId]: size });

  const handleAddToCart = (product) => {
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

    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(""), 2000);
  };

  // Filter products based on category & searchTerm
  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
    const searchMatch =
      p.name.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
      p.category.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
      p.subcategory.toLowerCase().includes(searchTerm?.toLowerCase() || "");
    return categoryMatch && searchMatch;
  });

  return (
    <div className="p-0 dark:bg-gray-700 dark:text-white">
      <div className="flex items-center justify-around p-5 gap-4 mb-6 bg-slate-200 dark:bg-gray-500">
        <h2 className="text-2xl font-bold mb-4">Fashion Categories</h2>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`flex items-center gap-1 p-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 ${
                isActive
                  ? "bg-red-500 text-white dark:bg-red-600"
                  : "bg-amber-100 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {cat.name}
              {getCategoryIcon(cat.name)}
            </button>
          );
        })}
        <button
          onClick={() => setSelectedCategory(null)}
          className="bg-red-200 p-2 rounded-md hover:bg-red-300 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
        >
          Show All
        </button>
      </div>

      <h2 className="text-2xl flex items-center gap-2 pl-10 m-auto font-bold mb-4 p-4 bg-slate-100 dark:text-slate-800 dark:hover:bg-red-600">
        Products {getCategoryIcon(selectedCategory)} : {selectedCategory || "Show All"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const selectedColorIndex = selectedColors[product.id] || 0;
          const selectedImage =
            product.images && product.images[selectedColorIndex]
              ? product.images[selectedColorIndex]
              : product.images[0];

          return (
            <div
              key={product.id}
              className="border mx-10 my-10 p-4 rounded shadow hover:shadow-lg bg-white dark:bg-gray-800"
            >
              <p className="font-semibold">Id No: {product.id}</p>
              <div className="flex justify-between mb-2">
                <p><strong>Brand:</strong> {product.brand}</p>
              </div>
              <img
                src={selectedImage}
                alt={product.name}
                className="border border-gray-500 w-full h-64 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-lg mt-5">{product.name}</h3>
              <p className="mb-2">Description: {product.description}</p>

              {product.colors && (
                <div className="mb-2">
                  <strong>Colors:</strong>{" "}
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleColorClick(product.id, idx)}
                      className={`inline-block mr-2 w-8 h-8 rounded-full border-2 cursor-pointer ${
                        selectedColors[product.id] === idx
                          ? "border-blue-500 scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              )}

              {product.sizes && (
                <div className="mb-2">
                  <strong>Sizes:</strong>{" "}
                  {product.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSizeClick(product.id, size)}
                      className={`inline-block mr-2 px-2 py-1 border rounded cursor-pointer ${
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

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition mt-2"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {message && (
        <div className="fixed top-11 right-20 transform mt-8 -translate-x-1 z-50 p-4 bg-orange-100 border border-green-400 rounded-lg text-purple-800 shadow-lg transition-all">
          {message}
        </div>
      )}
    </div>
  );
};

export default Home;
