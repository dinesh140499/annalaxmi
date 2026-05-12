<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { setLoading, clearUser, setUser } from "../features/authSlice";
import { useLocation } from "react-router-dom";

const PUBLIC_ROUTES = ["/login", "/otp"];

const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const shouldFetchProfile = !PUBLIC_ROUTES.includes(location.pathname);
  const { data, isPending, isError } = useAuth(shouldFetchProfile);

  useEffect(() => {
    dispatch(setLoading(isPending));

    if (data?.user) {
      dispatch(setUser(data));
    }

    if (isError) {
      dispatch(clearUser());
    }
  }, [data, isPending, isError, dispatch]);
=======
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { setUser, logoutUser } from "../features/authSlice";

const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const { data, isError } = useAuth();

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }

    if (isError) {
      dispatch(logoutUser());
    }
  }, [data, isError, dispatch]);
>>>>>>> 8ae99ce3c50b4bb96ec777714b9561ebcbaacfa8

  return children;
};

export default AuthProvider;
