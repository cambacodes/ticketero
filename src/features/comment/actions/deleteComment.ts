"use server";

import { fromErrorToActionState, toActionState } from "@/lib/form/forms";
import { db } from "@/server/db";
import { comment } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const deleteComment = async (commentId: string) => {
  try {
    await db.delete(comment).where(eq(comment.id, commentId)).returning();
  } catch (e) {
    return fromErrorToActionState(e, undefined);
  }

  return toActionState("SUCCESS", "Comment Deleted");
};
