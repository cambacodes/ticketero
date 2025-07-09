import { env } from "@/env";
import { generateS3Key } from "@/features/attachments/utils/generateS3Key";
import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { s3 } from "@/lib/aws";
import { db } from "@/server/db";
import { attachment } from "@/server/db/schema";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  await getAuthSessionOrRedirect();
  const pathParams = await params;
  const dbAttachment = await db.query.attachment.findFirst({
    where: eq(attachment.id, pathParams.attachmentId),
    with: {
      ticket: true,
    },
  });
  if (!dbAttachment) {
    return new Response("Attachment not found", { status: 404 });
  }
  const filename = generateS3Key({
    fileName: dbAttachment?.name,
    ticketId: dbAttachment?.ticketId,
    organizationId: dbAttachment?.ticket.organizationId,
    attachmentId: dbAttachment?.id,
  });
  const presignedUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: filename,
      ResponseContentDisposition: `inline; filename="${dbAttachment.name}"`,
    }),
    { expiresIn: 5 * 60 }
  );

  // In case we want to stream the file
  //   const response = await fetch(presignedUrl);

  //   return new Response(response.body, {
  //     headers: {
  //       "Content-Type":
  //         response.headers.get("content-type") ?? "application/octet-stream",
  //       "Content-Disposition": `inline; filename="${dbAttachment.name}"`,
  //     },
  //     status: response.status,
  //   });

  return new Response(null, {
    status: 307,
    headers: {
      Location: presignedUrl,
    },
  });
}
