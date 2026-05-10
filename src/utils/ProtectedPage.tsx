import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedPage = ({
  allowedRoles = ["user"],
}: {
  allowedRoles?: string[];
}) => {
  const { data, isPending, isError } = useAuth();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(data.user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedPage;