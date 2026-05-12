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

  return children;
};

export default AuthProvider;
