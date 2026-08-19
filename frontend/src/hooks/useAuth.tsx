import { useQuery } from "@tanstack/react-query";
import { get } from "../baseUrl";

export const useAuth = (enabled = true) => {
  const hasToken = typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => get("default", "user/profile"),
    retry: false,
    enabled: enabled && hasToken,
    refetchOnWindowFocus: true,
    staleTime: 0, // Always reflect the latest authenticated session
  });
};
