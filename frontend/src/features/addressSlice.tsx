import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AddressType = {
  _id?: string;
  firstname: string;
  lastname: string;
  phone: string;
  company_name: string;
  street: string;
  country: string;
  states: string;
  zip_code: string;
  landmark: string;
  type: "home" | "office" | "other";
};

type AddressState = {
  addresses: AddressType[];
  loading: boolean;
  error: string | null;
};

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<AddressType[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<AddressType>) => {
      state.addresses.push(action.payload);
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses.filter((item) => item._id === action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default addressSlice.reducer;
export const {addAddress,removeAddress,setAddresses,setError,setLoading} = addressSlice.actions;
