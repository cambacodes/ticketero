import { env } from "process";

import { s3 } from "@/lib/aws";
import { inngest } from "@/lib/inngest";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import { generateS3Key } from "../utils/generateS3Key";

export type AttachmentDeleteFunctionSchema = {
  data: {
    name: string;
    entityId: string;
    organizationId: string;
    attachmentId: string;
  };
};

export const attachmentDeleteEvent = inngest.createFunction(
  {
    id: "attachment",
  },
  { event: "app/attachment.delete" },
  async ({ event }) => {
    const { attachmentId, entityId, organizationId, name } = event.data;

    await s3.send(
      new DeleteObjectCommand({
        Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: generateS3Key({
          fileName: name,
          entityId: entityId,
          organizationId,
          attachmentId,
        }),
      })
    );
  }
);
