import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Loader from "../components/common/Loader";

const PublicRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    if (user.role === "admin" || user.role === "superadmin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/account/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
