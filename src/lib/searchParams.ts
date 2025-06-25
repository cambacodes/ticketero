import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const shallowAndClearOnDefault = {
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
    .withOptions(shallowAndClearOnDefault),
  sortValue: parseAsString
    .withDefault("desc")
    .withOptions(shallowAndClearOnDefault),
};
export const paginationPaser = {
  page: parseAsInteger.withDefault(1).withOptions(shallowAndClearOnDefault),
  size: parseAsInteger.withDefault(5).withOptions(shallowAndClearOnDefault),
};
export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
  ...paginationPaser,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
