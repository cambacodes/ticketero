"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";
import { EMPTY_ACTION_STATE } from "@/lib/form/forms";

import { createOrganization } from "../action/createOrganization";

const OrganizationCreateForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="name"
        placeholder="Name"
        defaultValue={actionState.payload?.get("name") as string}
      />
      <FieldError actionState={actionState} name="name" />
      <SubmitButton label="Create" />
    </Form>
  );
};

export { OrganizationCreateForm };
