import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { db } from "@/server/db";
import { comment } from "@/server/db/schema";

export const createComment = async (
  ticketId: string,
  content: string,
  parentCommentId?: string
) => {
  const {
    user: { id: authorId },
  } = await getAuthSessionOrRedirect();
  return await db
    .insert(comment)
    .values({
      ticketId,
      parentCommentId,
      authorId,
      content,
    })
    .returning();
};
