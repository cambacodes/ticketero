import type { attachment } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import Link from "next/link";

import AttachmentDeleteButton from "./AttatcmentDeleteButton";

type AttacmentItemProps = {
  attachment: InferSelectModel<typeof attachment> & { isOwner: boolean };
  onDelete?: (id: string) => void;
};

export default function AttachmentItem({
  attachment,
  onDelete,
}: AttacmentItemProps) {
  return (
    <div className="w-full flex justify-between">
      <Link target="_blank" href={`/api/aws/s3/attachments/${attachment.id}`}>
        <p className="text-sm">{attachment.name}</p>
      </Link>

      {attachment.isOwner && (
        <AttachmentDeleteButton id={attachment.id} onDelete={onDelete} />
      )}
    </div>
  );
}
