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
    },
  });
  if (dbAttachment?.ticket.authorId !== user.id) {
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
      ticketId: dbAttachment.ticketId,
      organizationId: dbAttachment.ticket.organizationId,
      name: dbAttachment.name,
    },
  });

  revalidatePath(ticketPath(dbAttachment.ticketId));
  return toActionState("SUCCESS", "Deleted attatcment");
};
