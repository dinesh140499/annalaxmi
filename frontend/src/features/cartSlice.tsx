import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import pulse from "../assets/images/products/pulse.png";
import grains from "../assets/images/products/grains.png";
import oils from "../assets/images/products/oils.png";

export interface CartItem {
  id: number | string;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

interface CouponState {
  code: string;
  discount: number;
  applied: boolean;
}

interface CartState {
  items: CartItem[];
  coupon: CouponState;
}

const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Organic Toor Dal (Unpolished)",
    weight: "1 Kg",
    price: 165,
    originalPrice: 195,
    quantity: 2,
    image: pulse,
  },
  {
    id: 2,
    name: "Himalayan Red Rice (Single Origin)",
    weight: "1 Kg",
    price: 210,
    originalPrice: 260,
    quantity: 1,
    image: grains,
  },
  {
    id: 3,
    name: "Cold-Pressed Kachi Ghani Mustard Oil",
    weight: "1 Litre",
    price: 175,
    originalPrice: 220,
    quantity: 1,
    image: oils,
  },
];

const initialState: CartState = {
  items: initialItems,
  coupon: {
    code: "",
    discount: 0,
    applied: false,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: number | string;
        name: string;
        weight?: string;
        price: number;
        originalPrice?: number;
        quantity?: number;
        image?: string;
      }>
    ) => {
      const { id, name, price, originalPrice = price, weight = "1 Kg", quantity = 1, image = pulse } = action.payload;
      const existing = state.items.find((item) => String(item.id) === String(id));
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          id,
          name,
          weight,
          price,
          originalPrice,
          quantity,
          image,
        });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number | string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => String(item.id) === String(id));
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => String(i.id) !== String(id));
        } else {
          item.quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter((item) => String(item.id) !== String(action.payload));
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = { code: "", discount: 0, applied: false };
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

      if (code === "GRAINPULSE") {
        state.coupon = {
          code,
          discount: Math.round(subtotal * 0.1),
          applied: true,
        };
      } else if (code === "FARMDIRECT20") {
        state.coupon = {
          code,
          discount: 100,
          applied: true,
        };
      } else if (code === "FREESHIP") {
        state.coupon = {
          code,
          discount: 49,
          applied: true,
        };
      }
    },
    removeCoupon: (state) => {
      state.coupon = { code: "", discount: 0, applied: false };
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
