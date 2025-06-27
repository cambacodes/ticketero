"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE, type ActionState } from "@/lib/form/forms";

import { createComment } from "../actions/createComment";
import { type CommentWithMetadata } from "../types";

type CommentReplyFormProps = {
  ticketId: string;
  onCreateReply?: (comment: CommentWithMetadata | undefined) => void;
  parentId: string;
};

export default function CommentReplyForm({
  ticketId,
  parentId,
  onCreateReply,
}: CommentReplyFormProps) {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId, parentId),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (actionState: ActionState<CommentWithMetadata>) => {
    onCreateReply?.(actionState.data);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" />
      <FieldError<CommentWithMetadata>
        actionState={actionState}
        name="content"
      />

      <SubmitButton label="Comment" />
    </Form>
  );
}
