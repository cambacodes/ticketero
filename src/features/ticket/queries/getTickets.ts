import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";

export const getTickets = async (userId?: string) => {
  const dbTickets = await db.query.ticket.findMany({
    with: {
      author: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
    where: userId ? eq(ticket.authorId, userId) : undefined,
    orderBy: [desc(ticket.createdAt)],
  });

  return dbTickets;
};
