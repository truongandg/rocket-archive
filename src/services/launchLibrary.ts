import type { Launch } from "../types/launch";
import type { PaginatedResponse } from "../types/launchLibrary";
import type { Rocket, RocketListOptions, RocketPage } from "../types/rocket";
import { fetchApi } from "./fetcher";

const ROCKET_LIST_LIMIT = 10;
const LAUNCH_HISTORY_PAGE_SIZE = 100;

/** Fetches one filtered, ordered page of launcher configurations. */
export async function getRockets(
  options: RocketListOptions = {},
  pageUrl?: string,
): Promise<RocketPage> {
  const params = new URLSearchParams({ limit: String(ROCKET_LIST_LIMIT) });
  params.set("mode", "detailed");
  if (options.search) params.set("search", options.search);
  if (options.active !== undefined) params.set("active", String(options.active));
  if (options.reusable !== undefined) params.set("reusable", String(options.reusable));
  if (options.ordering) params.set("ordering", options.ordering);

  const page = await fetchApi<PaginatedResponse<Rocket>>(
    pageUrl || `/launcher_configurations/?${params.toString()}`,
  );
  return { rockets: page.results, next: page.next };
}

/** Fetches the full data set for one launcher configuration. */
export async function getRocket(id: number): Promise<Rocket> {
  return fetchApi<Rocket>(`/launcher_configurations/${id}/`);
}

/** Fetches launches tied to a launcher configuration for the rocket detail page. */
export async function getRocketLaunches(id: number): Promise<Launch[]> {
  const launches: Launch[] = [];
  let next: string | null = `/launches/?rocket__configuration__id=${id}&limit=${LAUNCH_HISTORY_PAGE_SIZE}`;

  while (next) {
    const page: PaginatedResponse<Launch> = await fetchApi(next);
    launches.push(...page.results);
    next = page.next;
  }

  return launches;
}
