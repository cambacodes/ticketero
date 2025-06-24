"use server";

import { getAuthSessionOrThrow } from "@/features/auth/actions/getAuth";
import { fromErrorToActionState, toActionState } from "@/lib/form/forms";
import { ticketPath } from "@/routes";
import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import type { Ticket } from "../types";

export const updateTicketStatus = async (
  ticketId: string,
  status: Ticket["status"]
) => {
  try {
    const authSession = await getAuthSessionOrThrow();
    await db
      .update(ticket)
      .set({ status: status })
      .where(
        and(eq(ticket.id, ticketId), eq(ticket.authorId, authSession?.user?.id))
      );
  } catch (e) {
    return fromErrorToActionState(e, undefined);
  }
  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Status Updated");
};
