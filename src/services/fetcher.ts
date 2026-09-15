const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

export async function fetchApi<T>(pathOrUrl: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("Set VITE_API_BASE_URL in .env. Copy .env.sample to get started.");
  }
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${API_BASE_URL}${pathOrUrl}`;
  const response = await fetch(url, { headers: { Accept: "application/json" } });

  if (!response.ok) {
    throw new Error(`Launch Library request failed (${response.status}).`);
  }

  return response.json() as Promise<T>;
}
