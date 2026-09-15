import { useQueries } from "@tanstack/react-query";
import { getRocket } from "../services/launchLibrary";
import type { Rocket } from "../types/rocket";

export default function useRocketsById(rocketIds: number[]) {
  const results = useQueries({
    queries: rocketIds.map((id) => ({
      queryKey: ["rocket", id],
      queryFn: () => getRocket(id),
    })),
  });

  return {
    rockets: results.flatMap((result) => result.data ? [result.data] : []) as Rocket[],
    isLoading: results.some((result) => result.isLoading),
    isError: results.some((result) => result.isError),
  };
}
