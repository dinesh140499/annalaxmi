import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Loader from "../components/common/Loader";

const STAFF_ROLES = ["superadmin", "admin", "manager", "editor", "viewer"];

const PublicRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    if (STAFF_ROLES.includes(user.role)) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/account/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
