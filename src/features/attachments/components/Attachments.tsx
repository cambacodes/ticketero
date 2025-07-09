import CardCompact from "@/components/CardCompact";

import { getAttachments } from "../queries/getAttachments";
import AttachmentCreateForm from "./AttachmentCreateForm";
import AttachmentItem from "./AttachmentItem";

type AttachmentsProps = {
  ticketId: string;
  isOwner: boolean;
};

export default async function Attachments({
  ticketId,
  isOwner,
}: AttachmentsProps) {
  const attachments = await getAttachments(ticketId);
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

          {isOwner && <AttachmentCreateForm ticketId={ticketId} />}
        </>
      }
    />
  );
}
