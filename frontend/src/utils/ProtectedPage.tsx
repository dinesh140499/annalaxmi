import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { setUser, logoutUser } from "../features/authSlice";
import Loader from "../components/common/Loader";

const ProtectedPage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  // Query server only if user is not already present in memory
  const { data, isLoading, isError } = useAuth(!user);

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }

    if (isError && !user) {
      dispatch(logoutUser());
    }
  }, [data, isError, user, dispatch]);

  if (loading && !user) {
    return <Loader />;
  }

  if (!user && !data?.user && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedPage;
