"use server";

import { setCookie } from "@/lib/cookies";
import { fromErrorToActionState } from "@/lib/form/forms";
import { ticketsPath } from "@/routes";
import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (ticketId: string) => {
  try {
    await db.delete(ticket).where(eq(ticket.id, ticketId)).returning();
  } catch (e) {
    return fromErrorToActionState(e, undefined);
  }

  revalidatePath(ticketsPath());
  await setCookie("toast", "Ticket Deleted");
  redirect(ticketsPath());
};
