const API_BASE_URL = "https://lldev.thespacedevs.com/2.3.0";

export async function fetchApi<T>(pathOrUrl: string): Promise<T> {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${API_BASE_URL}${pathOrUrl}`;
  const response = await fetch(url, { headers: { Accept: "application/json" } });

  if (!response.ok) {
    throw new Error(`Launch Library request failed (${response.status}).`);
  }

  return response.json() as Promise<T>;
}
