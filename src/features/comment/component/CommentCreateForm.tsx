"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE, type ActionState } from "@/lib/form/forms";

import { createComment } from "../actions/createComment";
import { type CommentWithMetadata } from "../types";

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

export default function CommentCreateForm({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId, undefined),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (actionState: ActionState<CommentWithMetadata>) => {
    onCreateComment?.(actionState.data);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="What's on your mind ..." />
      <FieldError<CommentWithMetadata>
        actionState={actionState}
        name="content"
      />

      <SubmitButton label="Comment" />
    </Form>
  );
}
