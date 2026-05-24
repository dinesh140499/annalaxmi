import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type BillingType = {
  firstname: string;
  company_name: string;
  street: string;
  country: string;
  states: string;
  zip_code: string;
  phoneNo: string;
  email: string;
  type: string;
  _id?: string;
};

type UserType = {
  _id: string;
  role: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
  phoneNo?: string;
  addresses: BillingType[];
  dialCode?: string;
};

type AuthState = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser, logoutUser, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
