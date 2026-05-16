import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { setUser, logoutUser } from "../features/authSlice";

const ProtectedPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, isError } = useAuth(true);

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }

    if (isError) {
      dispatch(logoutUser());
    }
  }, [data, isError, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user && !data?.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedPage;
