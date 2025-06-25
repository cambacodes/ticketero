"use client";

import React, { useEffect } from "react";

import Pagination from "@/components/Pagination";
import { paginationPaser, searchParser } from "@/lib/searchParams";
import { useQueryState, useQueryStates } from "nuqs";

import type { paginatedTicketMetadata } from "../types";

type TicketPaginationProps = {
  paginatedTicketMetadata: paginatedTicketMetadata;
};

export default function TicketPagination({
  paginatedTicketMetadata,
}: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(paginationPaser);
  const [search] = useQueryState("search", searchParser);
  const prevSearch = React.useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) return;
    prevSearch.current = search;

    const initalizePagination = async () =>
      setPagination((prev) => ({
        ...prev,
        page: 1,
      }));

    void initalizePagination();
  }, [search, pagination, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPaginate={setPagination}
      paginatedTicketMetadata={paginatedTicketMetadata}
    />
  );
}
