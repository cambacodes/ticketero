"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";
import { EMPTY_ACTION_STATE } from "@/lib/form/forms";

import { createAttachments } from "../actions/createAttachments";
import { ACCEPTED } from "../constants";

type AttachmentCreateFormProps = { ticketId: string };

export default function AttachmentCreateForm({
  ticketId,
}: AttachmentCreateFormProps) {
  const [actionState, formAction] = useActionState(
    createAttachments.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={formAction} actionState={actionState}>
      <Input
        name="files"
        type="file"
        id="file"
        multiple
        accept={ACCEPTED.join(",")}
      />
      <FieldError actionState={actionState} name="files" />
      <SubmitButton label="Upload" />
    </Form>
  );
}
