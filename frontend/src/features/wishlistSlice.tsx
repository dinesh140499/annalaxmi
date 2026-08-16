import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import pulse from "../assets/images/products/pulse.png";
import grains from "../assets/images/products/grains.png";
import oils from "../assets/images/products/oils.png";
import spices from "../assets/images/products/spices.png";

export interface WishlistItem {
  id: number | string;
  name: string;
  weight: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  inStock: boolean;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialItems: WishlistItem[] = [
  {
    id: 1,
    name: "Organic Toor Dal (Unpolished)",
    weight: "1 Kg",
    category: "Pulses",
    image: pulse,
    price: 165,
    originalPrice: 195,
    rating: 5,
    inStock: true,
  },
  {
    id: 2,
    name: "Himalayan Red Rice (Single Origin)",
    weight: "1 Kg",
    category: "Grains",
    image: grains,
    price: 210,
    originalPrice: 260,
    rating: 5,
    inStock: true,
  },
  {
    id: 3,
    name: "Cold-Pressed Mustard Oil",
    weight: "1 Litre",
    category: "Oils",
    image: oils,
    price: 175,
    originalPrice: 220,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 4,
    name: "Salem Pure Turmeric Powder",
    weight: "250 g",
    category: "Spices",
    image: spices,
    price: 120,
    originalPrice: 150,
    rating: 4.9,
    inStock: true,
  },
];

const initialState: WishlistState = {
  items: initialItems,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some(
        (item) => String(item.id) === String(action.payload.id)
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number | string>) => {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(action.payload)
      );
    },
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const index = state.items.findIndex(
        (item) => String(item.id) === String(action.payload.id)
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
