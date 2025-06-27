export type PaginatedCursor = { id: string; createdAt: Date } | undefined;
export type PaginatedData<T> = {
  list: T[];
  metadata: { count: number; hasNextPage: boolean; cursor?: PaginatedCursor };
};
