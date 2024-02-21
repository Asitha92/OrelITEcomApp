// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      console.log("action.payload.access_token = ", action.payload);
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    clearToken: (state) => {
      state.token = null;
    },
    clearRefreshToken: (state) => {
      state.refreshToken = null;
    },
  },
});

export const {
  setUser,
  setToken,
  setRefreshToken,
  clearUser,
  clearToken,
  clearRefreshToken,
} = authSlice.actions;
export default authSlice.reducer;
