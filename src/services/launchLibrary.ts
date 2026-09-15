import type { RocketLaunch } from "../types/launch";
import type {
  ApiLaunch,
  ApiRocket,
  PaginatedResponse,
} from "../types/launchLibrary";
import type { Rocket } from "../types/rocket";
import type { RocketListOptions } from "../types/rocket";
import { fetchApi } from "./fetcher";

const ROCKET_LIST_LIMIT = 10;
const LAUNCH_HISTORY_PAGE_SIZE = 100;

function normalizeRocket(rocket: ApiRocket): Rocket {
  return {
    id: rocket.id,
    name: rocket.name,
    fullName: rocket.full_name || rocket.name,
    description: rocket.description || null,
    manufacturer: rocket.manufacturer
      ? { id: rocket.manufacturer.id, name: rocket.manufacturer.name, abbreviation: rocket.manufacturer.abbrev || null }
      : null,
    family: rocket.families?.[0]?.name || null,
    active: rocket.active ?? null,
    reusable: rocket.reusable ?? null,
    maidenFlight: rocket.maiden_flight || null,
    launchMass: rocket.launch_mass ?? null,
    leoCapacity: rocket.leo_capacity ?? null,
    gtoCapacity: rocket.gto_capacity ?? null,
    totalLaunchCount: rocket.total_launch_count || 0,
    successfulLaunches: rocket.successful_launches || 0,
    failedLaunches: rocket.failed_launches || 0,
    pendingLaunches: rocket.pending_launches || 0,
    successfulLandings: rocket.successful_landings || 0,
    failedLandings: rocket.failed_landings || 0,
    imageUrl: rocket.image?.image_url || null,
  };
}

function normalizeLaunch(launch: ApiLaunch): RocketLaunch {
  return {
    id: launch.id,
    name: launch.name,
    status: launch.status || null,
    net: launch.net || null,
    launchServiceProvider: launch.launch_service_provider || null,
    pad: launch.pad
      ? { id: launch.pad.id, name: launch.pad.name, location: launch.pad.location || null }
      : null,
    mission: launch.mission
      ? { name: launch.mission.name, description: launch.mission.description || null, type: launch.mission.type || null }
      : null,
    image: launch.image?.image_url || null,
  };
}

/** Fetches one filtered, ordered page of launcher configurations. */
export async function getRockets(options: RocketListOptions = {}): Promise<Rocket[]> {
  const params = new URLSearchParams({ limit: String(ROCKET_LIST_LIMIT) });
  if (options.search) params.set("search", options.search);
  if (options.active !== undefined) params.set("active", String(options.active));
  if (options.reusable !== undefined) params.set("reusable", String(options.reusable));
  if (options.ordering) params.set("ordering", options.ordering);

  const page = await fetchApi<PaginatedResponse<ApiRocket>>(
    `/launcher_configurations/?${params.toString()}`,
  );
  return page.results.map(normalizeRocket);
}

/** Fetches the full data set for one launcher configuration. */
export async function getRocket(id: number): Promise<Rocket> {
  return normalizeRocket(await fetchApi<ApiRocket>(`/launcher_configurations/${id}/`));
}

/** Fetches launches tied to a launcher configuration for the rocket detail page. */
export async function getRocketLaunches(id: number): Promise<RocketLaunch[]> {
  const launches: RocketLaunch[] = [];
  let next: string | null = `/launches/?rocket__configuration__id=${id}&limit=${LAUNCH_HISTORY_PAGE_SIZE}`;

  while (next) {
    const page: PaginatedResponse<ApiLaunch> = await fetchApi(next);
    launches.push(...page.results.map(normalizeLaunch));
    next = page.next;
  }

  return launches;
}
