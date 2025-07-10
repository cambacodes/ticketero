"use server";

import type { PaginatedCursor } from "@/app/types";
import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { db } from "@/server/db";
import { comment } from "@/server/db/schema";
import { and, eq, lt, or } from "drizzle-orm";

export const getComments = async (
  ticketId: string,
  cursor?: PaginatedCursor
) => {
  const { user } = await getAuthSessionOrRedirect();
  const PAGE_SIZE = 2;

  const [comments, count] = await db.transaction(async (tx) => {
    const compoundFilter = cursor
      ? or(
          lt(comment.createdAt, cursor.createdAt),
          and(
            eq(comment.createdAt, cursor.createdAt),
            lt(comment.id, cursor.id)
          )
        )
      : undefined;

    const whereClause = and(eq(comment.ticketId, ticketId), compoundFilter);

    const results = await tx.query.comment.findMany({
      where: whereClause,
      orderBy: (c, { desc }) => [desc(c.createdAt), desc(c.id)],
      limit: PAGE_SIZE + 1,
      with: {
        attachments: true,
        author: {
          columns: {
            id: true,
            name: true,
          },
        },
        parentComment: {
          with: {
            attachments: true,
            author: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        replies: {
          with: {
            attachments: true,
            author: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const normalizedComments = results.map(
      ({ replies, parentComment, ...comments }) => ({
        ...comments,
        parent: parentComment,
        isOwner: comments.author.id === user.id,
        replies: replies.map((reply) => ({
          ...reply,
          parent: comments,
          isOwner: reply.author.id === user.id,
        })),
      })
    );

    const totalCount = await tx.$count(comment, whereClause);
    return [normalizedComments, totalCount] as const;
  });

  const hasNextPage = comments.length > PAGE_SIZE;
  const sliced = hasNextPage ? comments.slice(0, -1) : comments;
  const last = sliced.at(-1);

  return {
    list: sliced,
    metadata: {
      count,
      hasNextPage,
      cursor: last ? { id: last.id, createdAt: last.createdAt } : undefined,
    },
  };
};
