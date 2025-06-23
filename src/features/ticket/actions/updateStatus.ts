"use server";

import { fromErrorToActionState, toActionState } from "@/lib/form/forms";
import { ticketPath } from "@/routes";
import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import type { Ticket } from "../types";

export const updateTicketStatus = async (
  ticketId: string,
  status: Ticket["status"]
) => {
  try {
    await db
      .update(ticket)
      .set({ status: status })
      .where(eq(ticket.id, ticketId));
  } catch (e) {
    return fromErrorToActionState(e, undefined);
  }
  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Status Updated");
};
