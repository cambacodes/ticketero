"use client";

import React, { useEffect } from "react";

import type { PaginatedCursor, PaginatedData } from "@/app/types";
import CardCompact from "@/components/CardCompact";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getComments } from "../queries/getComments";
import type { CommentWithMetadata } from "../types";
import CommentCreateForm from "./CommentCreateForm";
import CommentDeleteButton from "./CommentDeleteButton";
import CommentItem from "./CommentItem";
import CommentReplyForm from "./CommentReplyForm";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ["comments", ticketId];
  const queryClient = useQueryClient();
  const [parentIndex, setParentIndex] = React.useState<number | null>();

  const handleCreateReply = async () => {
    setParentIndex(null);
    await queryClient.invalidateQueries({ queryKey });
  };

  const { ref, inView } = useInView();

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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [data, fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  const comments = data.pages.flatMap((page) => page.list);

  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });

  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments?.map((comment, index) => (
          <div key={comment.id}>
            <CommentItem
              key={comment.id}
              comment={{ ...comment, parent: comment.parent! }}
              onReply={() => setParentIndex(index)}
              buttons={[
                ...(comment.isOwner
                  ? [
                      <CommentDeleteButton
                        key="0"
                        id={comment.id}
                        onDeleteComment={handleDeleteComment}
                      />,
                    ]
                  : []),
              ]}
            />
            {parentIndex === index && (
              <div className="ml-8">
                <CardCompact
                  title="Reply "
                  description={`Replying to comment above.`}
                  content={
                    <CommentReplyForm
                      ticketId={ticketId}
                      onCreateReply={handleCreateReply}
                      parentId={comment.id}
                    />
                  }
                />
              </div>
            )}
          </div>
        ))}
        {isFetchingNextPage && (
          <>
            <div className="flex gap-x-2">
              <Skeleton className="h-[82px] w-full" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
            <div className="flex gap-x-2">
              <Skeleton className="h-[82px] w-full" />
              <Skeleton className="h-[40px] w-[40px]" />
            </div>
          </>
        )}
      </div>
      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-xs italic">No more comments.</p>
        )}
      </div>
    </>
  );
};

export { Comments };
