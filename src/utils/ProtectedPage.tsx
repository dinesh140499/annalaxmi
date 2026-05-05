import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ReactType = {
  children: React.ReactNode;
};

const ProtectedPage = ({
  children,
  allowedRoles = ["user"],
}: {
  children: ReactType;
  allowedRoles?: string[];
}) => {
  const { data, isPending, isError } = useAuth();

  if (isPending) return <div>Loading...</div>;

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(data.user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
