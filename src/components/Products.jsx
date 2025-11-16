import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async (category = null) => {
    console.log("📡 Fetching products...");

    let query = supabase
      .from("products_new")
      .select("id, name, image, price, discount, category");

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("❌ Supabase fetch error:", error.message);
    } else {
      console.log("✅ Fetched products:", data);
      setProducts(data);
    }

    setLoading(false);
  };

  // Fetch categories
  const fetchCategories = async () => {
    console.log("📡 Fetching categories...");
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, icon, subcategories");

    if (error) {
      console.error("❌ Error fetching categories:", error.message);
    } else {
      console.log("✅ Fetched categories:", data);
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory); // auto-refresh when category changes
  }, [selectedCategory]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Products</h2>

      {/* Category List */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              border: selectedCategory === cat.name ? "2px solid #000" : "1px solid #ccc",
              background: selectedCategory === cat.name ? "#f0f0f0" : "#fff",
              cursor: "pointer",
            }}
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: selectedCategory === null ? "#f0f0f0" : "#fff",
            cursor: "pointer",
          }}
        >
          All
        </button>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={p.image || "https://placehold.co/200x200?text=No+Image"}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <p>₹{p.discount}</p>
              <p>Category: {p.category}</p>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>
            ⚠️ No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
