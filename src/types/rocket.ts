export interface RocketImage {
  image_url: string | null;
}

export interface RocketManufacturer {
  id: number;
  name: string;
  abbreviation: string | null;
}

export interface Rocket {
  id: number;
  name: string;
  full_name: string | null;
  description: string | null;
  manufacturer: RocketManufacturer | null;
  families: Array<{ id: number; name: string }>;
  active: boolean | null;
  reusable: boolean | null;
  maiden_flight: string | null;
  launch_mass: number | null;
  leo_capacity: number | null;
  gto_capacity: number | null;
  total_launch_count: number | null;
  successful_launches: number | null;
  failed_launches: number | null;
  pending_launches: number | null;
  successful_landings: number | null;
  failed_landings: number | null;
  image: RocketImage | null;
}

export interface RocketListOptions {
  search?: string;
  active?: boolean;
  reusable?: boolean;
  ordering?: "name" | "-total_launch_count";
}

export interface RocketPage {
  rockets: Rocket[];
  next: string | null;
}
