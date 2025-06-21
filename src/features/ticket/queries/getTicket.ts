import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getTicket = async (ticketId: string) => {
  return await db.query.ticket.findFirst({
    where: eq(ticket.id, ticketId),
  });
};
