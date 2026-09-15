export type PaginationResult<T> = {
  pageItems: T[];
  totalPages: number;
  currentPage: number;
};

export function paginate<T>(
  items: T[],
  pageSize: number,
  page: number
): PaginationResult<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(0, page), totalPages - 1);
  const start = currentPage * pageSize;
  const pageItems = items.slice(start, start + pageSize);
  return { pageItems, totalPages, currentPage };
}
