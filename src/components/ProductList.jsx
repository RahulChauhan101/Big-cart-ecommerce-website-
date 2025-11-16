
// // ProductList.jsx

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getProducts } from "../api/productApi";

// const ProductList = ({ categories }) => {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedColors, setSelectedColors] = useState({});
//   const [selectedSizes, setSelectedSizes] = useState({});
//   const [message, setMessage] = useState("");

//   // useEffect(() => {

//   //   const fetchData = async () => {
//   //     try {
//   //       const data = await getProducts();
//   //       setProducts(data || []);
//   //     } catch (error) {
//   //       console.error("Error fetching products:", error);
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const data = await getProducts();
//       setProducts(data?.products || []); // ✅ safely set array
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProducts([]); // fallback to empty array
//     }
//   };
//   fetchData();
// }, []);


//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleColorClick = (productId, colorIndex) => {
//     setSelectedColors({ ...selectedColors, [productId]: colorIndex });
//   };

//   const handleSizeClick = (productId, size) => {
//     setSelectedSizes({ ...selectedSizes, [productId]: size });
//   };

//   const handleAddToCart = (product) => {
//     setMessage(`${product.name} added to cart!`);
//     setTimeout(() => setMessage(""), 2000);
//   };

//   const getCategoryIcon = (category) => {
//     const cat = categories?.find((c) => c.name === category);
//     return cat?.icon || null;
//   };

//   const filteredProducts = selectedCategory
//     ? products.filter((p) => p.category === selectedCategory)
//     : products;

//   return (
//     <div className="p-4 dark:bg-gray-700 dark:text-white">
//       {/* Category Buttons */}
//       <div className="flex flex-wrap items-center gap-4 p-5 mb-6 bg-slate-200 dark:bg-gray-500">
//         {categories?.map((cat) => {
//           const isActive = selectedCategory === cat.name;
//           return (
//             <button
//               key={cat.id}
//               onClick={() => handleCategoryClick(cat.name)}
//               className={`flex items-center gap-1 p-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 ${
//                 isActive
//                   ? "bg-red-500 text-white dark:bg-red-600"
//                   : "bg-amber-100 dark:bg-gray-700 dark:text-gray-200"
//               }`}
//             >
//               {cat.name}
//               {getCategoryIcon(cat.name)}
//             </button>
//           );
//         })}
//         <button
//           onClick={() => setSelectedCategory(null)}
//           className="bg-red-200 p-2 rounded-md hover:bg-red-300 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
//         >
//           Show All
//         </button>
//       </div>

//       {/* Selected Category */}
//       <h2 className="text-2xl flex items-center gap-2 pl-4 m-auto font-bold mb-4 bg-slate-100 dark:bg-gray-600 dark:text-white p-4">
//         Products {selectedCategory ? `: ${selectedCategory}` : ": Show All"}
//       </h2>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProducts?.map((product) => {
//           const selectedColorIndex = selectedColors[product.id] || 0;
//           const selectedImage =
//             product.images?.[selectedColorIndex] || product.images?.[0];

//           return (
//             <div
//               key={product.id}
//               className="border mx-4 my-4 p-4 rounded shadow hover:shadow-lg bg-white dark:bg-gray-800"
//             >
//               <p className="font-semibold">ID: {product.id}</p>

//               <div className="flex justify-between mb-2">
//                 <p>
//                   <strong>Brand:</strong> {product.brand}
//                 </p>
//                 {product.ratings && (
//                   <div className="flex items-center">
//                     <strong>Rating: </strong>
//                     {product.ratings.average}
//                     {[1, 2, 3, 4, 5].map((i) => (
//                       <span
//                         key={i}
//                         className={`text-lg ${
//                           product.ratings.average >= i
//                             ? "text-yellow-400"
//                             : product.ratings.average >= i - 0.5
//                             ? "text-yellow-200"
//                             : "text-gray-300"
//                         }`}
//                       >
//                         ★
//                       </span>
//                     ))}
//                     <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">
//                       ({product.ratings.count} reviews)
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <img
//                 src={selectedImage}
//                 alt={product.name}
//                 className="w-full h-64 object-cover mb-2 rounded border"
//               />

//               <h3 className="font-semibold text-lg mt-2">{product.name}</h3>

//               <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 mb-2">
//                 <span className="line-through text-red-500">
//                   MRP: {product.currency} {product.price}
//                 </span>
//                 <span className="font-bold">
//                   Discount: {product.currency} {product.discountPrice}
//                 </span>
//               </div>

//               <div className="flex justify-end mb-2">
//                 <span className="font-bold text-lg text-gray-900 dark:bg-white p-1.5 rounded-lg">
//                   <span className="text-red-500">B</span>ig{" "}
//                   <span className="text-red-500">C</span>art: {product.BigCart}
//                 </span>
//               </div>

//               <p className="mb-2">Description: {product.description}</p>

//               {/* Colors */}
//               {product.colors?.length > 0 && (
//                 <div className="mb-2">
//                   <strong>Colors: </strong>
//                   {product.colors.map((color, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => handleColorClick(product.id, idx)}
//                       className={`inline-block mr-2 w-8 h-8 rounded-full border-2 cursor-pointer ${
//                         selectedColors[product.id] === idx
//                           ? "border-blue-500 scale-110"
//                           : "border-gray-300"
//                       }`}
//                       style={{ backgroundColor: color }}
//                       title={color}
//                     ></button>
//                   ))}
//                 </div>
//               )}

//               {/* Sizes */}
//               {product.sizes?.length > 0 && (
//                 <div className="mb-2">
//                   <strong>Sizes: </strong>
//                   {product.sizes.map((size, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => handleSizeClick(product.id, size)}
//                       className={`inline-block mr-2 px-2 py-1 border rounded cursor-pointer ${
//                         selectedSizes[product.id] === size
//                           ? "bg-green-500 text-white"
//                           : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               <p>
//                 <strong>Stock:</strong> {product.stock}
//               </p>

//               <Link
//                 to={`/product/${product.id}`}
//                 className="text-blue-500 hover:underline mt-2 block dark:text-blue-400"
//               >
//                 View Details
//               </Link>

//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition mt-2"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Message */}
//       {message && (
//         <div className="fixed top-11 right-20 transform mt-8 -translate-x-1 z-50 p-4 bg-orange-100 border border-green-400 rounded-lg text-purple-800 shadow-lg transition-all">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;


// ProductList.jsx

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getProducts } from "../api/productApi";

// const ProductList = ({ categories }) => {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedColors, setSelectedColors] = useState({});
//   const [selectedSizes, setSelectedSizes] = useState({});
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getProducts();
//         console.log("Fetched data:", data);

//         let productArray = [];

//         // ✅ handle multiple possible structures
//         if (Array.isArray(data)) {
//           productArray = data;
//         } else if (Array.isArray(data?.products)) {
//           productArray = data.products;
//         } else if (Array.isArray(data?.data)) {
//           productArray = data.data;
//         } else if (Array.isArray(data?.result?.products)) {
//           productArray = data.result.products;
//         } else {
//           console.error("Unexpected products structure:", data);
//         }

//         setProducts(productArray);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleColorClick = (productId, colorIndex) => {
//     setSelectedColors({ ...selectedColors, [productId]: colorIndex });
//   };

//   const handleSizeClick = (productId, size) => {
//     setSelectedSizes({ ...selectedSizes, [productId]: size });
//   };

//   const handleAddToCart = (product) => {
//     setMessage(`${product.name} added to cart!`);
//     setTimeout(() => setMessage(""), 2000);
//   };

//   const getCategoryIcon = (category) => {
//     const cat = categories?.find((c) => c.name === category);
//     return cat?.icon || null;
//   };

//   const filteredProducts = selectedCategory
//     ? products.filter((p) => p.category === selectedCategory)
//     : products;

//   return (
//     <div className="p-4 dark:bg-gray-700 dark:text-white">
//       {/* Category Buttons */}
//       <div className="flex flex-wrap items-center gap-4 p-5 mb-6 bg-slate-200 dark:bg-gray-500">
//         {categories?.map((cat) => {
//           const isActive = selectedCategory === cat.name;
//           return (
//             <button
//               key={cat.id}
//               onClick={() => handleCategoryClick(cat.name)}
//               className={`flex items-center gap-1 p-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 ${
//                 isActive
//                   ? "bg-red-500 text-white dark:bg-red-600"
//                   : "bg-amber-100 dark:bg-gray-700 dark:text-gray-200"
//               }`}
//             >
//               {cat.name}
//               {getCategoryIcon(cat.name)}
//             </button>
//           );
//         })}
//         <button
//           onClick={() => setSelectedCategory(null)}
//           className="bg-red-200 p-2 rounded-md hover:bg-red-300 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
//         >
//           Show All
//         </button>
//       </div>

//       {/* Selected Category */}
//       <h2 className="text-2xl flex items-center gap-2 pl-4 m-auto font-bold mb-4 bg-slate-100 dark:bg-gray-600 dark:text-white p-4">
//         Products {selectedCategory ? `: ${selectedCategory}` : ": Show All"}
//       </h2>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {Array.isArray(filteredProducts) &&
//           filteredProducts.map((product) => {
//             const selectedColorIndex = selectedColors[product.id] || 0;
//             const selectedImage =
//               product.images?.[selectedColorIndex] || product.images?.[0];

//             return (
//               <div
//                 key={product.id}
//                 className="border mx-4 my-4 p-4 rounded shadow hover:shadow-lg bg-white dark:bg-gray-800"
//               >
//                 <p className="font-semibold">ID: {product.id}</p>

//                 <div className="flex justify-between mb-2">
//                   <p>
//                     <strong>Brand:</strong> {product.brand}
//                   </p>
//                   {product.ratings && (
//                     <div className="flex items-center">
//                       <strong>Rating: </strong>
//                       {product.ratings.average}
//                       {[1, 2, 3, 4, 5].map((i) => (
//                         <span
//                           key={i}
//                           className={`text-lg ${
//                             product.ratings.average >= i
//                               ? "text-yellow-400"
//                               : product.ratings.average >= i - 0.5
//                               ? "text-yellow-200"
//                               : "text-gray-300"
//                           }`}
//                         >
//                           ★
//                         </span>
//                       ))}
//                       <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm">
//                         ({product.ratings.count} reviews)
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <img
//                   src={selectedImage}
//                   alt={product.name}
//                   className="w-full h-64 object-cover mb-2 rounded border"
//                 />

//                 <h3 className="font-semibold text-lg mt-2">{product.name}</h3>

//                 <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 mb-2">
//                   <span className="line-through text-red-500">
//                     MRP: {product.currency} {product.price}
//                   </span>
//                   <span className="font-bold">
//                     Discount: {product.currency} {product.discountPrice}
//                   </span>
//                 </div>

//                 <div className="flex justify-end mb-2">
//                   <span className="font-bold text-lg text-gray-900 dark:bg-white p-1.5 rounded-lg">
//                     <span className="text-red-500">B</span>ig{" "}
//                     <span className="text-red-500">C</span>art: {product.BigCart}
//                   </span>
//                 </div>

//                 <p className="mb-2">Description: {product.description}</p>

//                 {/* Colors */}
//                 {product.colors?.length > 0 && (
//                   <div className="mb-2">
//                     <strong>Colors: </strong>
//                     {product.colors.map((color, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => handleColorClick(product.id, idx)}
//                         className={`inline-block mr-2 w-8 h-8 rounded-full border-2 cursor-pointer ${
//                           selectedColors[product.id] === idx
//                             ? "border-blue-500 scale-110"
//                             : "border-gray-300"
//                         }`}
//                         style={{ backgroundColor: color }}
//                         title={color}
//                       ></button>
//                     ))}
//                   </div>
//                 )}

//                 {/* Sizes */}
//                 {product.sizes?.length > 0 && (
//                   <div className="mb-2">
//                     <strong>Sizes: </strong>
//                     {product.sizes.map((size, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => handleSizeClick(product.id, size)}
//                         className={`inline-block mr-2 px-2 py-1 border rounded cursor-pointer ${
//                           selectedSizes[product.id] === size
//                             ? "bg-green-500 text-white"
//                             : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 <p>
//                   <strong>Stock:</strong> {product.stock}
//                 </p>

//                 <Link
//                   to={`/product/${product.id}`}
//                   className="text-blue-500 hover:underline mt-2 block dark:text-blue-400"
//                 >
//                   View Details
//                 </Link>

//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition mt-2"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             );
//           })}
//       </div>

//       {/* Message */}
//       {message && (
//         <div className="fixed top-11 right-20 transform mt-8 -translate-x-1 z-50 p-4 bg-orange-100 border border-green-400 rounded-lg text-purple-800 shadow-lg transition-all">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Your working ngrok API URL
  const API_URL = "https://creviced-nonmeditative-neymar.ngrok-free.dev/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL, {
          headers: { "Accept": "application/json" },
        });

        console.log("✅ Fetched data:", response.data);
        console.log("Type of data:", typeof response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Unexpected response format.");
        }
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please check your server or ngrok URL.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">🛍️ Product List</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700">💰 Price: ₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

