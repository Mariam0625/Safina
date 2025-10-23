import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";   // ⬅️ new import

export const useStories = () => {
  return useQuery({
    queryKey: ["stories", localStorage.getItem("language")],
    queryFn: () => api("/stories"),   // ⬅️ now uses the helper
  });
};
