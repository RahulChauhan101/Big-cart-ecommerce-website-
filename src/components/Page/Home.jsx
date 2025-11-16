import React, { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { FaMale, FaFemale, FaChild } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { data } from "../../data/data";
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
      case "Men": return <FaMale className="h-5 text-blue-500" />;
      case "Women": return <FaFemale className="h-5 text-pink-500" />;
      case "Kids": return <FaChild className="h-5 text-purple-500" />;
      default: return <AiOutlineShopping className="text-green-600" />;
    }
  };

  const handleCategoryClick = (name) => setSelectedCategory(name);
  const handleColorClick = (productId, index) =>
    setSelectedColors({ ...selectedColors, [productId]: index });
  const handleSizeClick = (productId, size) =>
    setSelectedSizes({ ...selectedSizes, [productId]: size });

  const handleAddToCart = (product) => {
    const colorIndex = selectedColors[product.id] || 0;
    const size = selectedSizes[product.id] || null;

    const selectedImage =
      product.images?.[colorIndex] || product.images[0];

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        selectedColorIndex: colorIndex,
        selectedSize: size,
        selectedImage,
      })
    );

    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(""), 2000);
  };

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
      {/* CATEGORY LIST - MOBILE SCROLLABLE */}
      <div className="flex items-center gap-4 p-4 bg-slate-200 dark:bg-gray-500 overflow-x-auto whitespace-nowrap">
        <h2 className="text-xl font-bold">Categories</h2>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition 
                ${
                  isActive
                    ? "bg-red-500 text-white dark:bg-red-600"
                    : "bg-amber-100 dark:bg-gray-700"
                }`}
            >
              {cat.name}
              {getCategoryIcon(cat.name)}
            </button>
          );
        })}

        <button
          onClick={() => setSelectedCategory(null)}
          className="bg-red-200 px-4 py-2 rounded-md hover:bg-red-300 dark:bg-red-700 dark:hover:bg-red-600"
        >
          All
        </button>
      </div>

      {/* TITLE */}
      <h2 className="text-xl md:text-2xl flex items-center gap-2 pl-6 py-4 bg-slate-100 dark:bg-gray-900">
        Products: {selectedCategory || "All"}
      </h2>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {filteredProducts.map((product) => {
          const selectedColorIndex = selectedColors[product.id] || 0;
          const selectedImage =
            product.images?.[selectedColorIndex] || product.images[0];

          return (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:shadow-lg bg-white dark:bg-gray-800"
            >
              <p className="font-semibold text-sm">ID: {product.id}</p>

              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-56 sm:h-64 md:h-72 object-cover rounded mt-2"
              />

              <h3 className="font-semibold text-lg mt-3">{product.name}</h3>
              <p className="text-sm mb-2">{product.description}</p>

              {/* COLORS */}
              {product.colors && (
                <div className="mb-2">
                  <strong>Colors:</strong>
                  <div className="flex gap-2 mt-1">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleColorClick(product.id, idx)}
                        className={`w-7 h-7 rounded-full border-2 ${
                          selectedColorIndex === idx
                            ? "border-blue-500 scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* SIZES */}
              {product.sizes && (
                <div className="mb-2">
                  <strong>Sizes:</strong>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSizeClick(product.id, size)}
                        className={`px-2 py-1 border rounded text-sm ${
                          selectedSizes[product.id] === size
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-500 w-full text-white py-2 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Message Popup */}
      {message && (
        <div className="fixed bottom-5 right-5 px-4 py-3 bg-green-100 text-green-700 border border-green-400 rounded shadow-lg z-50">
          {message}
        </div>
      )}
    </div>
  );
};

export default Home;
