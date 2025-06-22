"use client";

import React, { useActionState } from "react";

import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE } from "@/lib/form/forms";

import { upsertTicket } from "../actions/upsertTicket";
import type { Ticket } from "../types";
import FieldError from "./form/FieldError";
import Form from "./form/Form";
import SubmitButton from "./form/SubmitButton";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};
export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );
  const [dateTime, setDateTime] = React.useState<string>(
    ticket?.deadline.toISOString().slice(0, 16) ?? ""
  );

  const handleDateChange = (date: Date) => {
    setDateTime(date.toISOString().slice(0, 16));
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleNoop = React.useCallback(() => {}, []);

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        name="title"
        id="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError<Ticket> actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        name="content"
        id="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError<Ticket> actionState={actionState} name="content" />

      <Label htmlFor="deadline">Deadline</Label>
      <DatePicker
        onChange={handleDateChange}
        defaultValue={
          (actionState.payload?.get("deadline") as string)
            ? new Date(actionState.payload?.get("deadline") as string)
            : ticket?.deadline
        }
      />
      <FieldError<Ticket> actionState={actionState} name="deadline" />
      <input
        type="datetime-local"
        value={dateTime}
        name="deadline"
        id="deadline"
        className="hidden"
        onChange={handleNoop}
      />

      <Label htmlFor="bounty">Bounty</Label>
      <Input
        type="number"
        name="bounty"
        id="bounty"
        defaultValue={
          (actionState.payload?.get("bounty") as string) ?? ticket?.bounty
        }
      />
      <FieldError<Ticket> actionState={actionState} name="bounty" />

      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
}
