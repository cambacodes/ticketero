import { db } from "@/server/db";
import { comment, ticket } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import type {
  AttachmentEntity,
  CommentAttachmentSubject,
  TicketAttachmentSubject,
} from "../types";
import { isTicketEntity } from "../utils/guards";

export const getAttachmentSubject = async ({
  entity,
  entityId,
  userId,
}: AttachmentEntity & { userId: string }) => {
  if (isTicketEntity(entity)) {
    return getTicketAttachmentSubject(entityId, userId);
  } else {
    return getCommentAttachmentSubject(entityId, userId);
  }
};

async function getTicketAttachmentSubject(
  ticketId: string,
  userId: string
): Promise<TicketAttachmentSubject | undefined> {
  const ticketRow = await db.query.ticket.findFirst({
    where: eq(ticket.id, ticketId),
    columns: { authorId: true, organizationId: true },
  });

  if (!ticketRow) return undefined;

  return {
    entity: "TICKET",
    ticket: ticketRow,
    isOwner: ticketRow.authorId === userId,
    organizationId: ticketRow.organizationId,
  };
}

async function getCommentAttachmentSubject(
  commentId: string,
  userId: string
): Promise<CommentAttachmentSubject | undefined> {
  const commentRow = await db.query.comment.findFirst({
    where: eq(comment.id, commentId),
    columns: { authorId: true },
    with: {
      ticket: {
        columns: { organizationId: true },
      },
    },
  });

  if (!commentRow) return undefined;

  return {
    entity: "COMMENT",
    comment: commentRow,
    isOwner: commentRow.authorId === userId,
    organizationId: commentRow.ticket.organizationId,
  };
}
