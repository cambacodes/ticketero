import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { desc } from "drizzle-orm";

export const getTickets = async () => {
  const dbTickets = await db
    .select()
    .from(ticket)
    .orderBy(desc(ticket.createdAt));

  return dbTickets;
};
