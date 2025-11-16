import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

/* ------------------------------------------
   PRODUCT CARD COMPONENT 
-------------------------------------------*/
const ProductCard = ({
  p,
  handleAddToCart,
  getColorRGBA,
  renderStars,
  selectedSizes,
  handleSizeClick
}) => {
  const colors = p.Color?.split(",").map((c) => c.trim()) || [];
  const images = p.image?.split(",").map((img) => img.trim()) || [];

  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  return (
    <div className="border rounded-xl shadow-md p-4 bg-white dark:bg-gray-800 hover:shadow-xl transition text-gray-900 dark:text-white">
      
      {/* Product Image */}
      <img
        src={selectedImage || "https://placehold.co/200x200?text=No+Image"}
        alt={p.name}
        className="w-full h-48 object-cover rounded-lg transition-all duration-300"
      />

      {/* Product Info */}
      <h1 className="text-lg font-semibold mt-3">{p.name}</h1>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{p.Description}</p>

      {/* Stars */}
      <div className="flex mt-2 items-center">
        {renderStars(p.Ratings)}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{p.Ratings}</span>
      </div>

      {/* Price */}
      <div className="mt-2">
        <p className="font-semibold">₹{p.price}</p>
        <p className="text-sm text-green-600">Discount: ₹{p.discount}</p>
      </div>

      <p className="text-sm mt-1">Category: {p.category}</p>
      <p className="text-sm">ID No: {p.id}</p>

      {/* Colors (click -> change image) */}
      <p className="text-sm mt-2 flex items-center gap-2">
        Colors:
        <div className="flex gap-2">
          {colors.map((c, i) => (
            <button
              key={i}
              className="w-6 h-6 rounded-full border hover:scale-110 transition dark:border-gray-500"
              style={{ backgroundColor: getColorRGBA(c) }}
              title={`Show ${c} image`}
              onClick={() => setSelectedImage(images[i])}
            ></button>
          ))}
        </div>
      </p>

      {/* Size Selector */}
      {p.Size && (
        <div className="mt-3">
          <strong>Sizes:</strong>
          <div className="mt-1 flex flex-wrap gap-2">
            {p.Size.split(",").map((size, idx) => (
              <button
                key={idx}
                onClick={() => handleSizeClick(p.id, size.trim())}
                className={`px-3 py-1 border rounded-md text-sm cursor-pointer 
                  ${
                    selectedSizes[p.id] === size.trim()
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }
                `}
              >
                {size.trim()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <button
        onClick={() => handleAddToCart(p)}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

/* ------------------------------------------
   MAIN PRODUCTS COMPONENT 
-------------------------------------------*/
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState({});

  // Fetch Products
  const fetchProducts = async (category = null) => {
    let query = supabase
      .from("products_new")
      .select(
        "id, name, image, price, discount, category, Size, Description, Ratings, Color"
      );

    if (category) query = query.eq("category", category);

    const { data } = await query;
    setProducts(data);
    setLoading(false);
  };

  // Fetch Categories
  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("id, name, icon, subcategories");
    setCategories(data);
  };

  // Add to cart
  const handleAddToCart = (product) => {
    console.log("Added to Cart:", product);
    alert(`🛒 Added ${product.name} to cart!`);
  };

  // Handle size click
  const handleSizeClick = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-900 dark:text-white">
        Loading...
      </p>
    );

  // ⭐ Star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-yellow-400 text-lg ${
          i < rating ? "opacity-100" : "opacity-30"
        }`}
      >
        ★
      </span>
    ));
  };

  // 🎨 Convert color name to actual color
  const getColorRGBA = (colorName) => {
    if (!colorName) return "#ccc";

    const colors = {
      red: "rgba(255,0,0,1)",
      blue: "rgba(0,0,255,1)",
      green: "rgba(0,128,0,1)",
      black: "rgba(0,0,0,1)",
      white: "rgba(255,255,255,1)",
      yellow: "rgba(255,255,0,1)",
      pink: "rgba(255,105,180,1)",
    };

    return colors[colorName.toLowerCase()] || "#ccc";
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-5">🛍️ Products</h2>

      {/* Categories */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-lg border transition 
              ${
                selectedCategory === cat.name
                  ? "border-black dark:border-white bg-gray-200 dark:bg-gray-700"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              }`}
          >
            {cat.name}
          </button>
        ))}

        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg border transition 
            ${
              selectedCategory === null
                ? "border-black dark:border-white bg-gray-200 dark:bg-gray-700"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            }`}
        >
          All
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              handleAddToCart={handleAddToCart}
              getColorRGBA={getColorRGBA}
              renderStars={renderStars}
              selectedSizes={selectedSizes}
              handleSizeClick={handleSizeClick}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
            ⚠️ No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
