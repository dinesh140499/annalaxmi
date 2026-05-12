// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "../features/commonSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authReducer,
  },
});

// ✅ Typed exports for Redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
