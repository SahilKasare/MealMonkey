// slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeOrders: [], // Orders currently in progress
  orderHistory: [], // Past orders
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setActiveOrders: (state, action) => {
      state.activeOrders = action.payload;
    },
    addToOrderHistory: (state, action) => {
      state.orderHistory.push(action.payload);
    },
    clearOrders: (state) => {
      state.activeOrders = [];
      state.orderHistory = [];
    },
  },
});

export const { setActiveOrders, addToOrderHistory, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
