import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserType = {
  _id?: string;
  id?: string;
  role: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  avatar?: string;
  phoneNo?: string;
  dialCode?: string;
  addresses?: any[];
};

type AuthState = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: true, // Will be set to false once AuthProvider checks profile cookie
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
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
