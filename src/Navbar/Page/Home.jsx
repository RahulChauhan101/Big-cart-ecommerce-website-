import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { data } from "../../data/data";

const Home = () => {
  const { categories, products } = data;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  const handleCategoryClick = (name) => setSelectedCategory(name);
  const handleColorClick = (productId, index) =>
    setSelectedColors({ ...selectedColors, [productId]: index });
  const handleSizeClick = (productId, size) =>
    setSelectedSizes({ ...selectedSizes, [productId]: size });

  const handleAddToCart = (product) => {
    const selectedColorIndex = selectedColors[product.id] || 0;
    const selectedSize = selectedSizes[product.id] || null;

    const cartItem = {
      ...product,
      quantity: 1,
      selectedColorIndex,
      selectedSize,
      selectedImage:
        product.images && product.images[selectedColorIndex]
          ? product.images[selectedColorIndex]
          : product.images[0],
    };

    const existing = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColorIndex === selectedColorIndex
    );

    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColorIndex === selectedColorIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, cartItem];
    }

    setCart(updatedCart);
    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory ? p.category === selectedCategory : true;
    const searchMatch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <>
      <Navbar onSearch={(term) => setSearchTerm(term)} />

      <div className="p-0 dark:bg-gray-900 dark:text-white">
        <div className="flex items-center justify-around p-4 gap-4 mb-6 bg-slate-200 dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4">Fashion Categories</h2>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex items-center gap-1 p-2 rounded hover:bg-red-200 dark:hover:bg-red-700 ${
                  isActive
                    ? "bg-red-500 text-white dark:bg-red-600"
                    : "bg-amber-100 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {Icon && <Icon />}
                {cat.name}
              </button>
            );
          })}
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-red-200 p-2 rounded hover:bg-red-300 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
          >
            Show All
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-4">Products</h2>
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
                className="border p-4 rounded shadow hover:shadow-lg bg-white dark:bg-gray-800"
              >
                <div className="flex justify-between mb-2">
                  <p>
                    <strong>Brand:</strong> {product.brand}
                  </p>
                  <p>
                    <strong>Rating:</strong> {product.ratings.average} ⭐ (
                    {product.ratings.count} reviews)
                  </p>
                </div>

                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-64 object-cover mb-2 rounded"
                />

                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="line-through text-red-500">
                    {product.currency} {product.price}
                  </span>{" "}
                  <span className="font-bold">
                    {product.currency} {product.discountPrice}
                  </span>
                </p>
                <p className="mb-2">{product.description}</p>

                {product.colors && (
                  <div className="mb-2">
                    <strong>Colors:</strong>{" "}
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleColorClick(product.id, idx)}
                        className={`inline-block mr-2 px-2 py-1 border rounded cursor-pointer ${
                          selectedColors[product.id] === idx
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {color}
                      </button>
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

                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="text-blue-500 hover:underline mt-2 block dark:text-blue-400"
                >
                  View Details
                </Link>

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
      </div>
    </>
  );
};

export default Home;
