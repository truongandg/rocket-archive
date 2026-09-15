export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  flight_number: number;
  details: string | null;
  rocket: string;
  launchpad: string;
  links: {
    patch: { small: string | null; large: string | null };
    flickr: { small: string[]; original: string[] };
    webcast: string | null;
  };
}

export interface LaunchCollection {
  id: string;
  name: string;
  launchIds: string[];
}
