import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   items: [],
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const product = action.payload;
         const keyMatcher = (item) =>
            item.id === product.id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColorIndex === product.selectedColorIndex;
         const existing = state.items.find(keyMatcher);
         const qty = product.quantity ? product.quantity : 1;
         if (existing) {
            existing.quantity += qty;
         } else {
            state.items.push({ ...product, quantity: qty });
         }
      },
      removeFromCart: (state, action) => {
         const { id, selectedSize, selectedColorIndex } = action.payload;
         state.items = state.items.filter(
            (item) =>
               !(item.id === id && item.selectedSize === selectedSize && item.selectedColorIndex === selectedColorIndex)
         );
      },
      updateQuantity: (state, action) => {
         const { id, selectedSize, selectedColorIndex, quantity } = action.payload;
         const item = state.items.find(
            (i) => i.id === id && i.selectedSize === selectedSize && i.selectedColorIndex === selectedColorIndex
         );
         if (!item) return;
         if (quantity <= 0) {
            state.items = state.items.filter(
               (i) => !(i.id === id && i.selectedSize === selectedSize && i.selectedColorIndex === selectedColorIndex)
            );
         } else {
            item.quantity = quantity;
         }
      },
      clearCart: (state) => {
         state.items = [];
      },
   },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// Backward compatibility for existing usages
export const addtocart = addToCart;
export default cartSlice.reducer;