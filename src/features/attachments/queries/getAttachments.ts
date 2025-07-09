"use server";

import { db } from "@/server/db";
import { attachment } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getAttachments = async (ticketId: string) => {
  return db.query.attachment.findMany({
    where: eq(attachment.ticketId, ticketId),
  });
};
