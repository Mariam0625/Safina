import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useAssistant = () => {
  return useMutation({
    mutationFn: ({ text }: { text: string }) =>
      api("/assistant/reply", {
        method: "POST",
        body: JSON.stringify({ text, context: { screen: "checkin" } }),
      }),
  });
};
