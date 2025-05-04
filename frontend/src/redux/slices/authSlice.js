// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores user data (e.g., userId, role)
  token: null, // Stores JWT token
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
