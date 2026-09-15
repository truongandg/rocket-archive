import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getRockets } from "../services/launchLibrary";
import type { Rocket, RocketListOptions, RocketPage } from "../types/rocket";

const EMPTY_ROCKETS: Rocket[] = [];

function selectRockets(data: InfiniteData<RocketPage>) {
  return data.pages.flatMap((page) => page.rockets);
}

export default function useRockets(options: RocketListOptions) {
  const query = useInfiniteQuery({
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
    select: selectRockets,
  });

  return { ...query, rockets: query.data ?? EMPTY_ROCKETS };
}
