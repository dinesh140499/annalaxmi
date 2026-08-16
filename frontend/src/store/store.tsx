import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "../features/commonSlice";
import authSlice from "../features/authSlice";
import addressSlice from "../features/addressSlice";
import cartSlice from "../features/cartSlice";
import wishlistSlice from "../features/wishlistSlice";

export const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
    address: addressSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
