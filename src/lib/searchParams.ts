import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const NotShallowAndClearOnDefault = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const sortParser = {
  sortKey: parseAsString
    .withDefault("createdAt")
    .withOptions(NotShallowAndClearOnDefault),
  sortValue: parseAsString
    .withDefault("desc")
    .withOptions(NotShallowAndClearOnDefault),
};
export const paginationPaser = {
  page: parseAsInteger.withDefault(1).withOptions(NotShallowAndClearOnDefault),
  size: parseAsInteger.withDefault(5).withOptions(NotShallowAndClearOnDefault),
};
export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
  ...paginationPaser,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
