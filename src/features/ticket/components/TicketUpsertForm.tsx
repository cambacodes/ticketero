"use client";

import React, { useActionState } from "react";

import {
  DatePicker,
  type ImperativeHanldeFromDatePicker,
} from "@/components/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fromCent } from "@/lib/currency";
import { EMPTY_ACTION_STATE } from "@/lib/form/forms";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { upsertTicket } from "../actions/upsertTicket";
import type { Ticket } from "../types";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};
export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const datePickerImperativeHandle =
    React.useRef<ImperativeHanldeFromDatePicker>(null);
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  return (
    <Form
      action={action}
      actionState={actionState}
      onSuccess={() => {
        datePickerImperativeHandle.current?.reset();
      }}
    >
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

      <div className="flex gap-x-2 ">
        <div className="w-1/2 flex flex-col gap-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string)
                ? new Date(actionState.payload?.get("deadline") as string)
                : ticket?.deadline
            }
            imparativeHandle={datePickerImperativeHandle}
          />
          <FieldError<Ticket> actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2 flex flex-col gap-y-2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            type="number"
            name="bounty"
            step="0.01"
            id="bounty"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket.bounty) : "")
            }
          />
          <FieldError<Ticket> actionState={actionState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
}
