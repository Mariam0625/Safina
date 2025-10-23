import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useHelplines() {
  return useQuery({
    queryKey: ["helplines", localStorage.getItem("language") || "ar"],
    queryFn: () => api("/resources/helplines"),
  });
}
