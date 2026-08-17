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

// Safe hydration from localStorage on initial page load / refresh
const getInitialUser = (): UserType | null => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (e) {
    console.error("Error reading user from localStorage:", e);
  }
  return null;
};

const initialUser = getInitialUser();

const initialState: AuthState = {
  user: initialUser,
  loading: !initialUser, // If user is already in storage, avoid unnecessary loading state
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
      if (action.payload) {
        try {
          localStorage.setItem("user", JSON.stringify(action.payload));
        } catch (e) {
          console.error("Error saving user to localStorage:", e);
        }
      } else {
        localStorage.removeItem("user");
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      try {
        localStorage.removeItem("user");
      } catch (e) {
        console.error("Error removing user from localStorage:", e);
      }
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
