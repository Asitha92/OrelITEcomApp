import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orelReducer from "./orelSlice";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./auth/authSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, orelReducer);

export const store = configureStore({
  reducer: {
    orelReducer: persistedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export let persistor = persistStore(store);
