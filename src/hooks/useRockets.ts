import { useInfiniteQuery } from "@tanstack/react-query";
import { getRockets } from "../services/launchLibrary";
import type { RocketListOptions } from "../types/rocket";

export default function useRockets(options: RocketListOptions) {
  return useInfiniteQuery({
    queryKey: [
      "rockets",
      options.search || "",
      options.active ?? null,
      options.reusable ?? null,
      options.ordering || "",
    ],
    initialPageParam: "",
    queryFn: ({ pageParam }) => getRockets(options, pageParam || undefined),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });
}
