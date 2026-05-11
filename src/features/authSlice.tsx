import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  _id: string;
  role: string;
  firstname?: string;
  lastname?: string;
  phoneNo?: string;
};

type AuthState = {
  user: UserType | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: true,
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
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;