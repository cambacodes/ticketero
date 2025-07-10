import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getTicket = async (ticketId: string) => {
  const { user } = await getAuthSessionOrRedirect();
  const dbTicket = await db.query.ticket.findFirst({
    where: eq(ticket.id, ticketId),
    with: {
      author: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!dbTicket) return undefined;

  return {
    ...dbTicket,
    isOwner: dbTicket?.author.id === user.id,
  };
};
