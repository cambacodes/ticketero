"use server";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { ticketPath } from "@/routes";
import { type attachment } from "@/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

import { fileSchema } from "../schema";
import * as attachmentService from "../service";

const createAttachmentsSchema = z.object({
  files: fileSchema.refine(
    (files) => files.length !== 0,
    "At least one file is required"
  ),
});

export const createAttachments = async (
  entityId: string,
  entity: InferSelectModel<typeof attachment>["entity"],
  _actionState: ActionState,
  formData: FormData
) => {
  const { user } = await getAuthSessionOrRedirect();

  const subject = await attachmentService.getAttachmentSubject({
    entityId,
    entity,
    userId: user.id,
  });

  if (!subject) {
    return toActionState("ERROR", "Ticket not found");
  }

  if (!subject.isOwner) {
    return toActionState("ERROR", "Not authorized");
  }

  try {
    const { files } = createAttachmentsSchema.parse({
      files: formData.getAll("files"),
    });

    await attachmentService.createAttachments({
      subject,
      entity,
      entityId,
      files,
    });
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  revalidatePath(ticketPath(entityId));

  return toActionState("SUCCESS", "Attachments added");
};
