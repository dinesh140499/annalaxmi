import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const PublicRoute = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  // ✅ If user already logged in
  if (user) {
    return <Navigate to="/account/dashboard" replace />;
  }

  // ✅ If not logged in
  return <Outlet />;
};

export default PublicRoute;
