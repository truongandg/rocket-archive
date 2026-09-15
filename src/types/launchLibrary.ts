export interface ApiImage {
  image_url?: string | null;
}

export interface ApiManufacturer {
  id: number;
  name: string;
  abbrev?: string | null;
}

export interface ApiRocket {
  id: number;
  name: string;
  full_name?: string | null;
  description?: string | null;
  manufacturer?: ApiManufacturer | null;
  families?: Array<{ name?: string | null }> | null;
  active?: boolean | null;
  reusable?: boolean | null;
  maiden_flight?: string | null;
  launch_mass?: number | null;
  leo_capacity?: number | null;
  gto_capacity?: number | null;
  total_launch_count?: number | null;
  successful_launches?: number | null;
  failed_launches?: number | null;
  pending_launches?: number | null;
  successful_landings?: number | null;
  failed_landings?: number | null;
  image?: ApiImage | null;
}

export interface ApiLaunch {
  id: string;
  name: string;
  status?: { id: number; name: string } | null;
  net?: string | null;
  launch_service_provider?: { id: number; name: string } | null;
  pad?: {
    id: number;
    name: string;
    location?: { name: string } | null;
  } | null;
  mission?: { name: string; description?: string | null; type?: string | null } | null;
  image?: ApiImage | null;
}

export interface PaginatedResponse<T> {
  next: string | null;
  results: T[];
}
