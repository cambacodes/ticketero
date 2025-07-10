"use server";

import { fileSchema } from "@/features/attachments/schema";
import * as attachmentService from "@/features/attachments/service";
import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { db } from "@/server/db";
import { comment } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
  files: fileSchema,
});

export const createComment = async (
  ticketId: string,
  parentCommentId: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  const {
    user: { id: authorId },
  } = await getAuthSessionOrRedirect();
  try {
    const { content, files } = createCommentSchema.parse({
      content: formData.get("content"),
      files: formData.getAll("files"),
    });

    const [insertedComment] = await db
      .insert(comment)
      .values({
        ticketId,
        parentCommentId,
        authorId,
        content,
      })
      .returning();

    const fullComment = await db.query.comment.findFirst({
      where: eq(comment.id, insertedComment!.id),
      with: {
        author: true,
        ticket: true,
      },
    });

    await attachmentService.createAttachments({
      entityId: fullComment!.id,
      entity: "COMMENT",
      files,
      subject: {
        comment: fullComment!,
        isOwner: true,
        organizationId: fullComment!.ticket.organizationId,
        entity: "COMMENT",
      },
    });
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }
  return toActionState("SUCCESS", "Comment Created", formData);
};
