import Link from "next/link";

import AttachmentDeleteButton from "./AttatcmentDeleteButton";

type AttacmentItemProps = {
  attachment: {
    ticketId: string;
    name: string;
    id: string;
  };
};

export default function AttachmentItem({ attachment }: AttacmentItemProps) {
  return (
    <div className="w-full flex justify-between">
      <Link target="_blank" href={`/api/aws/s3/attachments/${attachment.id}`}>
        <p className="text-sm">{attachment.name}</p>
      </Link>

      <AttachmentDeleteButton id={attachment.id} />
    </div>
  );
}
