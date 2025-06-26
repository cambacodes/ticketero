import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { db } from "@/server/db";

export const getComments = async () => {
  
  await getAuthSessionOrRedirect();
  return await db.query.comment.findMany({
    columns: {
      id: true,
      content: true,
      createdAt: true,
    },
    with: {
      author: {
        columns: {
          id: true,
          name: true,
        },
      },
      replies: {
        columns: {
          id: true,
          content: true,
          createdAt: true,
        },
        with: {
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
};
