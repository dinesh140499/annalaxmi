import { useQuery } from "@tanstack/react-query";
import { get } from "../baseUrl";

export const useAuth = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => get("default", "user/profile"),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
};
