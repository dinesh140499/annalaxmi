import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { setUser, logoutUser, setLoading } from "../features/authSlice";

const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useAuth();

  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (data?.user) {
      dispatch(setUser(data.user));
    }

    if (isError) {
      dispatch(logoutUser());
    }
  }, [data, isError, isLoading, dispatch]);

  return children;
};

export default AuthProvider;