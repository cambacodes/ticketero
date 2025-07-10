import CardCompact from "@/components/CardCompact";
import type { attachment } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

import { getAttachments } from "../queries/getAttachments";
import AttachmentCreateForm from "./AttachmentCreateForm";
import AttachmentItem from "./AttachmentItem";

type AttachmentsProps = {
  entityId: string;
  isOwner: boolean;
  entity: InferSelectModel<typeof attachment>["entity"];
};

export default async function Attachments({
  entityId,
  entity,
  isOwner,
}: AttachmentsProps) {
  const attachments = await getAttachments(entityId, entity);
  return (
    <CardCompact
      title="Attachments"
      description="Attached files (images, documents, etc.)"
      content={
        <>
          <div className="m-2 flex flex-col gap-y-2 mb-4">
            {attachments.map((attachment) => (
              <AttachmentItem key={attachment.id} attachment={attachment} />
            ))}
          </div>

          {isOwner && (
            <AttachmentCreateForm entityId={entityId} entity={entity} />
          )}
        </>
      }
    />
  );
}
