"use server";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { db } from "@/server/db";
import { comment } from "@/server/db/schema";
import z from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
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
    const { content } = createCommentSchema.parse(Object.fromEntries(formData));
    await db
      .insert(comment)
      .values({
        ticketId,
        parentCommentId,
        authorId,
        content,
      })
      .returning();
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }
  return toActionState("SUCCESS", "Comment Created", formData);
};
