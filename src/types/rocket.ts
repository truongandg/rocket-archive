export interface RocketManufacturer {
  id: number;
  name: string;
  abbreviation: string | null;
}

export interface Rocket {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  manufacturer: RocketManufacturer | null;
  family: string | null;
  active: boolean | null;
  reusable: boolean | null;
  maidenFlight: string | null;
  launchMass: number | null;
  leoCapacity: number | null;
  gtoCapacity: number | null;
  totalLaunchCount: number;
  successfulLaunches: number;
  failedLaunches: number;
  pendingLaunches: number;
  successfulLandings: number;
  failedLandings: number;
  imageUrl: string | null;
}

export interface RocketListOptions {
  search?: string;
  active?: boolean;
  reusable?: boolean;
  ordering?: "name" | "-total_launch_count";
}
