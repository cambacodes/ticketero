"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { LucideTrash } from "lucide-react";

import { deleteComment } from "../actions/deleteComment";

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment?: (id: string) => void;
};

export default function CommentDeleteButton({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) {
  return (
    <>
      <ConfirmDialog
        action={deleteComment.bind(null, id)}
        onSuccess={() => onDeleteComment?.(id)}
        trigger={
          <Button variant={"outline"} size={"icon"}>
            <LucideTrash className="w-4 h-4" />
          </Button>
        }
      />
    </>
  );
}
