import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { data, isPending } = useAuth();

  if (isPending) {
    return <div>Loading...</div>;
  }

  // ✅ If user already logged in
  if (data?.user) {
    return <Navigate to="/account/dashboard" replace />;
  }

  // ✅ If not logged in
  return <Outlet />;
};

export default PublicRoute;