import {configureStore} from '@reduxjs/toolkit';
import cartReducer from "./reducer/cartReducer"

// Load cart from localStorage
const loadCart = () => {
  try {
    const raw = localStorage.getItem("cart_items");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const preloadedState = {
  cart: {
    items: loadCart(),
  },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Persist cart to localStorage on changes
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("cart_items", JSON.stringify(state.cart.items));
  } catch {}
});

export default store;