import React from "react";

import type { PaginatedCursor, PaginatedData } from "@/app/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { getComments } from "../queries/getComments";
import type { CommentWithMetadata } from "../types";

export const usePaginatedComments = (
  ticketId: string,
  paginatedComments: PaginatedData<CommentWithMetadata>
) => {
  const queryKey = ["comments", ticketId];
  const queryClient = useQueryClient();
  const [parentIndex, setParentIndex] = React.useState<number | null>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as PaginatedCursor,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });
  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });

  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });

  const handleCreateReply = async () => {
    setParentIndex(null);
    await queryClient.invalidateQueries({ queryKey });
  };

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    parentIndex,
    setParentIndex,
    handleCreateReply,
    handleCreateComment,
    handleDeleteComment,
  };
};
