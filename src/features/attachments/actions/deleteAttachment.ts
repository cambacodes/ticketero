"use server";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { toActionState } from "@/lib/form/forms";
import { inngest } from "@/lib/inngest";
import { ticketPath } from "@/routes";
import { db } from "@/server/db";
import { attachment } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteAttachment = async (attachmentId: string) => {
  const { user } = await getAuthSessionOrRedirect();

  const dbAttachment = await db.query.attachment.findFirst({
    where: eq(attachment.id, attachmentId),
    with: {
      ticket: true,
      comment: {
        with: {
          ticket: true,
        },
      },
    },
  });

  if (!dbAttachment) {
    return toActionState("ERROR", "Attachment not found");
  }

  const { entity, ticket, comment } = dbAttachment;

  const isTicket = entity === "TICKET";

  const entityId = isTicket ? dbAttachment.ticketId : dbAttachment.commentId;
  const organizationId = isTicket
    ? ticket?.organizationId
    : comment?.ticket.organizationId;

  const authorId = isTicket ? ticket?.authorId : comment?.authorId;

  if (!entityId || !organizationId) {
    return toActionState("ERROR", "Invalid attachment data");
  }

  if (authorId !== user.id) {
    return toActionState("ERROR", "Not authorized");
  }

  const deletedRecord = await db
    .delete(attachment)
    .where(eq(attachment.id, attachmentId))
    .returning();

  if (!deletedRecord) {
    return toActionState("ERROR", "Attachment not found");
  }

  await inngest.send({
    name: "app/attachment.delete",
    data: {
      attachmentId,
      entityId,
      organizationId,
      name: dbAttachment.name,
    },
  });

  const ticketId = (isTicket ? dbAttachment.ticketId : comment?.ticketId) ?? "";

  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Deleted attachment");
};
