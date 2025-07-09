"use server";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { db } from "@/server/db";
import { attachment } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getAttachments = async (ticketId: string) => {
  const { user } = await getAuthSessionOrRedirect();
  const dbAttachment = await db.query.attachment.findMany({
    where: eq(attachment.ticketId, ticketId),
    with: {
      ticket: {
        columns: {
          authorId: true,
        },
      },
    },
  });

  return dbAttachment.map((dbAttachment) => ({
    ...dbAttachment,
    isOwner: dbAttachment.ticket.authorId === user.id,
  }));
};
