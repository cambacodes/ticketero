"use server";

import { getAuthSessionOrThrow } from "@/features/auth/actions/getAuth";
import { setCookie } from "@/lib/cookies";
import { toCent } from "@/lib/currency";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { ticketsPath } from "@/routes";
import { db } from "@/server/db";
import { ticket } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const upserTicketSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.coerce.date(),
  bounty: z.coerce
    .number({ message: "Required" })
    .min(1, { message: "Required" }),
});
export const upsertTicket = async (
  ticketId: string | undefined,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { user } = await getAuthSessionOrThrow();
    const data = upserTicketSchema.parse({
      id: ticketId,
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    data.bounty = toCent(data.bounty);

    if (ticketId) {
      const [updatedTicket] = await db
        .update(ticket)
        .set(data)
        .where(and(eq(ticket.id, ticketId), eq(ticket.authorId, user?.id)))
        .returning();

      if (!updatedTicket) {
        return toActionState("ERROR", "Not authorized");
      }
    } else {
      await db.insert(ticket).values({ ...data, authorId: user.id });
    }
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  revalidatePath(ticketsPath());

  if (ticketId) {
    await setCookie("toast", "Ticket Updated");
    redirect(ticketsPath());
  }

  return toActionState("SUCCESS", "Ticket created");
};
