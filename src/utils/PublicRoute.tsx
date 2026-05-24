import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Loader from "../components/common/Loader";

const PublicRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <Loader/>;
  }

  return user ? <Navigate to="/account/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
