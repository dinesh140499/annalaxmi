import { useQuery } from "@tanstack/react-query";
import { get } from "../baseUrl";

export const useAuth = (enabled=true) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => get("default", "user/profile"),
    retry: false,
    enabled:true,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
};
