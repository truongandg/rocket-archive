import type { Launch } from "../types/launch";

const API_URL = "https://api.spacexdata.com/v4";

export async function getLaunches(): Promise<Launch[]> {
  const response = await fetch(`${API_URL}/launches`);
  if (!response.ok) throw new Error("SpaceX missions could not be loaded.");
  return response.json() as Promise<Launch[]>;
}
