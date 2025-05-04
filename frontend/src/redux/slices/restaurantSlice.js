// slices/restaurantSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menu: [], // Stores menu items
  reviews: [], // Stores reviews for the restaurant
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    clearRestaurantData: (state) => {
      state.menu = [];
      state.reviews = [];
    },
  },
});

export const { setMenu, addReview, clearRestaurantData } = restaurantSlice.actions;
export default restaurantSlice.reducer;
