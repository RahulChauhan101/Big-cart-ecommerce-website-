import { FaMale, FaFemale, FaChild } from "react-icons/fa";

export  const data = {
    categories: [
      {
        id: 1,
        name: "Men",
        icon: FaMale,
        subcategories: ["T-Shirts", "Shirts", "Jeans", "Jackets", "Shoes"],
      },
      {
        id: 2,
        name: "Women",
        icon: FaFemale,
        subcategories: ["Dresses", "Tops", "Jeans", "Heels", "Handbags", "Jackets"],
      },
      {
        id: 3,
        name: "Kids",
        icon: FaChild,
        subcategories: ["T-Shirts", "Shorts", "Shoes"],
      },
    ],
    products: [
      {
        id: 101,
        name: "Classic White T-Shirt",
        category: "Men",
        subcategory: "T-Shirts",
        brand: "Hysun Wear",
        price: 499,
        discountPrice: 399,
        currency: "₹",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Blue"],
        stock: 120,
        images: [
          "https://dummyimage.com/400x400/ffffff/000000&text=White+T-Shirt",
          "https://dummyimage.com/400x400/000000/ffffff&text=Black+T-Shirt",
        ],
        description: "Soft cotton round-neck T-shirt, perfect for casual wear.",
        ratings: { average: 4.5, count: 240 },
      },
      {
        id: 102,
        name: "Denim Jacket",
        category: "Women",
        subcategory: "Jackets",
        brand: "Urban Style",
        price: 1999,
        discountPrice: 1599,
        currency: "₹",
        sizes: ["S", "M", "L"],
        colors: ["Blue Denim", "Black Denim"],
        stock: 45,
        images: [
          "https://dummyimage.com/400x400/87ceeb/000000&text=Denim+Jacket",
          "https://dummyimage.com/400x400/000000/ffffff&text=Black+Jacket",
        ],
        description: "Trendy denim jacket with slim fit design.",
        ratings: { average: 4.2, count: 95 },
      },
      {
        id: 103,
        name: "Kids Running Shoes",
        category: "Kids",
        subcategory: "Shoes",
        brand: "PlayRun",
        price: 1299,
        discountPrice: 1099,
        currency: "₹",
        sizes: ["28", "30", "32", "34"],
        colors: ["Red", "Blue"],
        stock: 60,
        images: [
          "https://dummyimage.com/400x400/ff0000/ffffff&text=Red+Shoes",
          "https://dummyimage.com/400x400/0000ff/ffffff&text=Blue+Shoes",
        ],
        description: "Lightweight and comfortable running shoes for kids.",
        ratings: { average: 4.7, count: 180 },
      },
      {
        id: 104,
        name: "Slim Fit Jeans",
        category: "Men",
        subcategory: "Jeans",
        brand: "StreetWear",
        price: 1599,
        discountPrice: 1399,
        currency: "₹",
        sizes: ["30", "32", "34", "36"],
        colors: ["Dark Blue", "Black"],
        stock: 80,
        images: ["https://dummyimage.com/400x400/1e3d59/ffffff&text=Slim+Fit+Jeans"],
        description: "Comfortable slim-fit denim jeans for men.",
        ratings: { average: 4.3, count: 150 },
      },
         {
      "id": 105,
      "name": "Floral Summer Dress",
      "category": "Women",
      "subcategory": "Dresses",
      "brand": "Elegance",
      "price": 2499,
      "discountPrice": 1999,
      "currency": "₹",
      "sizes": ["XS", "S", "M", "L"],
      "colors": ["Yellow Floral", "Pink Floral"],
      "stock": 35,
      "images": [
        "https://dummyimage.com/400x400/ffb6c1/000000&text=Floral+Dress"
      ],
      "description": "Lightweight floral dress, perfect for summer outings.",
      "ratings": { "average": 4.6, "count": 200 }
    },
    {
      "id": 106,
      "name": "Men's Leather Jacket",
      "category": "Men",
      "subcategory": "Jackets",
      "brand": "RiderX",
      "price": 4999,
      "discountPrice": 3999,
      "currency": "₹",
      "sizes": ["M", "L", "XL"],
      "colors": ["Brown", "Black"],
      "stock": 25,
      "images": [
        "https://dummyimage.com/400x400/654321/ffffff&text=Leather+Jacket"
      ],
      "description": "Premium leather jacket with biker style fit.",
      "ratings": { "average": 4.8, "count": 90 }
    },
    {
      "id": 107,
      "name": "Kids Cartoon T-Shirt",
      "category": "Kids",
      "subcategory": "T-Shirts",
      "brand": "FunWear",
      "price": 699,
      "discountPrice": 499,
      "currency": "₹",
      "sizes": ["4Y", "5Y", "6Y", "7Y"],
      "colors": ["Red", "Yellow", "Blue"],
      "stock": 100,
      "images": [
        "https://dummyimage.com/400x400/ffff00/000000&text=Cartoon+Tee"
      ],
      "description": "Bright cartoon print T-shirt for kids.",
      "ratings": { "average": 4.4, "count": 75 }
    },
          {
      "id": 108,
      "name": "Women's Skinny Jeans",
      "category": "Women",
      "subcategory": "Jeans",
      "brand": "StyleFit",
      "price": 1799,
      "discountPrice": 1499,
      "currency": "₹",
      "sizes": ["26", "28", "30", "32"],
      "colors": ["Blue", "Black"],
      "stock": 65,
      "images": [
        "https://dummyimage.com/400x400/00008b/ffffff&text=Skinny+Jeans"
      ],
      "description": "Stretchable skinny-fit denim jeans for women.",
      "ratings": { "average": 4.1, "count": 130 }
    },
        {
      "id": 109,
      "name": "Men's Formal Shirt",
      "category": "Men",
      "subcategory": "Shirts",
      "brand": "OfficeLine",
      "price": 1199,
      "discountPrice": 999,
      "currency": "₹",
      "sizes": ["M", "L", "XL"],
      "colors": ["White", "Sky Blue"],
      "stock": 70,
      "images": [
        "https://dummyimage.com/400x400/87ceeb/000000&text=Formal+Shirt"
      ],
      "description": "Cotton blend formal shirt ideal for office wear.",
      "ratings": { "average": 4.0, "count": 50 }
    },
      {
      "id": 110,
      "name": "Women's Handbag",
      "category": "Women",
      "subcategory": "Handbags",
      "brand": "GlamBag",
      "price": 2999,
      "discountPrice": 2499,
      "currency": "₹",
      "colors": ["Black", "Tan"],
      "stock": 40,
      "images": [
        "https://dummyimage.com/400x400/000000/ffffff&text=Handbag"
      ],
      "description": "Stylish leatherette handbag with multiple compartments.",
      "ratings": { "average": 4.5, "count": 140 }
    },
    
  
    ],
  };
