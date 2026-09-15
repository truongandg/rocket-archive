export interface PaginatedResponse<T> {
  next: string | null;
  results: T[];
}
