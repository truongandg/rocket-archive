import { useQuery } from "@tanstack/react-query";
import { getRockets } from "../services/launchLibrary";
import type { RocketListOptions } from "../types/rocket";

export default function useRockets(options: RocketListOptions) {
  return useQuery({
    queryKey: ["rockets", options],
    queryFn: () => getRockets(options),
  });
}
