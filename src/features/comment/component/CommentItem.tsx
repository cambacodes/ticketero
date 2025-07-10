import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import AttachmentItem from "@/features/attachments/components/AttachmentItem";
import { format } from "date-fns";

import type { CommentWithMetadata } from "../types";

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
  onReply?: () => void;
  onDeleteAttachment?: () => void;
};

export default function CommentItem({
  comment,
  buttons,
  onReply,
  onDeleteAttachment,
}: CommentItemProps) {
  return (
    <div className="flex gap-x-2 ml-8">
      <Card className="p-4 flex-1 flex flex-col gap-y-2">
        {comment.parent && (
          <div className="text-xs text-muted-foreground">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs cursor-pointer"
                >
                  Reply to comment #{comment.parent.id.slice(0, 6)}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="max-w-sm bg-background border p-3 space-y-1">
                <div className="text-sm text-muted-foreground">
                  {comment.parent.author.name ?? "Deleted User"} ·{" "}
                  {format(comment.parent.createdAt, "yyyy-MM-dd HH:mm")}
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {comment.parent.content}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        )}

        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.isOwner ? "You" : (comment.author.name ?? "Deleted User")}
          </p>
          <p className="text-sm text-muted-foreground">
            {format(new Date(comment.createdAt), "yyyy-MM-dd HH:mm")}
          </p>
        </div>

        <p className="whitespace-pre-line">{comment.content}</p>

        <CardFooter className="w-full flex justify-end px-0">
          <Button onClick={onReply}>Reply</Button>
        </CardFooter>
        {comment.attachments.length > 0 && (
          <>
            <Separator />
            <div className="m-2 flex flex-col gap-y-2 mb-4">
              {comment.attachments.map((attachment) => (
                <AttachmentItem
                  key={attachment.id}
                  onDelete={onDeleteAttachment}
                  attachment={{ ...attachment, isOwner: comment.isOwner }}
                />
              ))}
            </div>
          </>
        )}
      </Card>

      <div className="flex flex-col gap-y-1">{buttons}</div>
    </div>
  );
}
