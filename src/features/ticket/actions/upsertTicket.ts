"use server";

import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { ticketsPath } from "@/routes";
import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const upserTicketSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.date(),
  bounty: z.number(),
});
export const upsertTicket = async (
  ticketId: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = upserTicketSchema.parse({
      id: ticketId,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      deadline: new Date(formData.get("deadline") as string),
      bounty: parseInt(formData.get("bounty") as string),
    });

    await db
      .insert(ticket)
      .values(data)
      .onConflictDoUpdate({ target: ticket.id, set: data });
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  revalidatePath(ticketsPath());
  if (ticketId) {
    redirect(ticketsPath());
  }

  return toActionState("SUCCESS", "Ticket created");
};
