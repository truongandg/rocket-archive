import { useQuery } from "@tanstack/react-query";
import { getRocket } from "../services/launchLibrary";

export default function useRocket(id: number) {
  return useQuery({
    queryKey: ["rocket", id],
    queryFn: () => getRocket(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
