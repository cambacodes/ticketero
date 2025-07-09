"use server";

import { env } from "@/env";
import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { s3 } from "@/lib/aws";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { ticketPath } from "@/routes";
import { db } from "@/server/db";
import { attachment, ticket } from "@/server/db/schema";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

import { ACCEPTED, MAX_SIZE } from "../constants";
import { generateS3Key } from "../utils/generateS3Key";
import { sizeInMB } from "../utils/size";

const createAttachmentsSchema = z.object({
  files: z
    .custom<FileList>()
    .transform((files) => Array.from(files))
    .transform((files) => files.filter((file) => file.size > 0))
    .refine(
      (files) => files.filter((file) => sizeInMB(file.size) <= MAX_SIZE),
      `Max file size is ${MAX_SIZE} MB`
    )
    .refine(
      (files) => files.every((file) => ACCEPTED.includes(file.type)),
      `Accepted file types: ${ACCEPTED.join(", ")}`
    )
    .refine((files) => files.length !== 0, "At least one file is required"),
});

export const createAttachments = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData
) => {
  const { user, session } = await getAuthSessionOrRedirect();

  const dbTicket = await db.query.ticket.findFirst({
    where: eq(ticket.id, ticketId),
  });

  if (!dbTicket) {
    return toActionState("ERROR", "Ticket not found");
  }

  if (dbTicket.authorId !== user.id) {
    return toActionState("ERROR", "Not authorized");
  }

  try {
    const { files } = createAttachmentsSchema.parse({
      files: formData.getAll("files"),
    });
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const [dbattachment] = await db
        .insert(attachment)
        .values({
          ticketId,
          name: file.name,
        })
        .returning();

      if (!dbattachment) {
        return toActionState("ERROR", "Something went wrong");
      }

      await s3.send(
        new PutObjectCommand({
          Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
          Key: generateS3Key({
            fileName: file.name,
            ticketId,
            organizationId: dbTicket.organizationId,
            attachmentId: dbattachment.id,
          }),
          Body: buffer,
          ContentType: file.type,
        })
      );
    }
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Attachments added");
};
