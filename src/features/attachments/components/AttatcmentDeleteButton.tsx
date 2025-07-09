"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { LucideTrash } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteAttachment } from "../actions/deleteAttachment";

type AttachmentDeleteButtonProps = {
  id: string;
  onDelete?: (id: string) => void;
};

export default function AttachmentDeleteButton({
  id,
  onDelete,
}: AttachmentDeleteButtonProps) {
  const router = useRouter();
  return (
    <>
      <ConfirmDialog
        action={deleteAttachment.bind(null, id)}
        onSuccess={() => {
          router.refresh();
          onDelete?.(id);
        }}
        trigger={
          <Button
            variant={"destructive"}
            size={"icon"}
            className="size-6 rounded-md cursor-pointer"
          >
            <LucideTrash className="size-3" />
          </Button>
        }
      />
    </>
  );
}
