"use server";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { db } from "@/server/db";
import { attachment } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { eq } from "drizzle-orm";

// Define a type with relations
type AttachmentWithAuthor = InferSelectModel<typeof attachment> & {
  ticket?: { authorId: string };
  comment?: { authorId: string };
};

export const getAttachments = async (
  entityId: string,
  entity: "TICKET" | "COMMENT"
) => {
  const { user } = await getAuthSessionOrRedirect();

  const isTicket = entity === "TICKET";

  const dbAttachments = (await db.query.attachment.findMany({
    where: eq(isTicket ? attachment.ticketId : attachment.commentId, entityId),
    with: isTicket
      ? {
          ticket: {
            columns: { authorId: true },
          },
        }
      : {
          comment: {
            columns: { authorId: true },
          },
        },
  })) as AttachmentWithAuthor[];

  return dbAttachments.map((att) => ({
    ...att,
    isOwner: isTicket
      ? att.ticket?.authorId === user.id
      : att.comment?.authorId === user.id,
  }));
};
