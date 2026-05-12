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

  return children;
};

export default AuthProvider;
