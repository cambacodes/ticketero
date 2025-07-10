import { env } from "process";

import { s3 } from "@/lib/aws";
import { toActionState } from "@/lib/form/forms";
import { db } from "@/server/db";
import { attachment } from "@/server/db/schema";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import type { AttachmentEntity, AttachmentSubject } from "../types";
import { generateS3Key } from "../utils/generateS3Key";
import { isTicketEntity } from "../utils/guards";

type CreateAttachmentArgs = {
  subject: AttachmentSubject;
  entity: AttachmentEntity["entity"];
  entityId: string;
  files: File[];
};
export const createAttachments = async ({
  subject,
  entity,
  entityId,
  files,
}: CreateAttachmentArgs) => {
  try {
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const [dbattachment] = await db
        .insert(attachment)
        .values({
          ...(isTicketEntity(entity)
            ? { ticketId: entityId }
            : { commentId: entityId }),
          entity,
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
            entityId,
            entity,
            organizationId: subject.organizationId,
            attachmentId: dbattachment.id,
          }),
          Body: buffer,
          ContentType: file.type,
        })
      );
    }
  } catch (err) {
    throw err;
  }
};
