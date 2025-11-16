// // import axios from "axios";

// // // const API_URL = " https://creviced-nonmeditative-neymar.ngrok-free.dev /api/products";
// // const API_URL = " https://creviced-nonmeditative-neymar.ngrok-free.dev /api/products";



// // // Get all products
// // export const getProducts = async () => {
// //   try {
// //     const response = await axios.get(API_URL);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching products:", error);
// //     return [];
// //   }
// // };

// // // Get single product by ID
// // export const getProductById = async (id) => {
// //   try {
// //     const response = await axios.get(`${API_URL}/${id}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching product:", error);
// //     return null;
// //   }
// // };

// // // Add a new product
// // export const addProduct = async (product) => {
// //   try {
// //     const response = await axios.post(API_URL, product);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error adding product:", error);
// //     return null;
// //   }
// // };
// import axios from "axios";

// // const API_URL = "https://creviced-nonmeditative-neymar.ngrok-free.dev/api/products";
// const API_URL = "https://creviced-nonmeditative-neymar.ngrok-free.dev/api/products";


// // Get all products
// export const getProducts = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };
import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // 🔹 change ngrok later
// const API_URL = "https://creviced-nonmeditative-neymar.ngrok-free.dev/api/products"; // 🔹 change ngrok later

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
