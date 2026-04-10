// features/commonSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  button: {
    cart: boolean;
    [key: string]: boolean;
  };
  searchConfig: {
    items: any[];
    getLabelKey: string; 
  };
}

const initialState: CommonState = {
  button: {
    cart: false,
  },
  searchConfig: {
    items: [],
    getLabelKey: "name",
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setButton: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      state.button = { ...state.button, ...action.payload };
    },
    setSearchConfig: (
      state,
      action: PayloadAction<{ items: any[]; getLabelKey?: string }>
    ) => {
      state.searchConfig.items = action.payload.items;
      state.searchConfig.getLabelKey = action.payload.getLabelKey || "name";
    },
  },
});

export const { setButton, setSearchConfig } = commonSlice.actions;
export default commonSlice.reducer;
