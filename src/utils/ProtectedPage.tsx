import { useQuery } from "@tanstack/react-query";
import { useEffect, type ReactNode } from "react";
import { get } from "../baseUrl";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => get("default", "user/profile"),
    retry: false, 
  });

  useEffect(() => {
    if (isError || data?.success === false) {
      navigate("/login");
    }
  }, [isError, data, navigate]);

  // ✅ Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ✅ If authenticated → render children
  return <>{children}</>;
};

export default ProtectedPage;