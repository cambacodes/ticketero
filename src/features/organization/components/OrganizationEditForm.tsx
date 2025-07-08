"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/lib/form/forms";

import { updateOrganization } from "../actions/updateOrganization";

interface OrganizationEditFormProps {
  organization: {
    name: string;
    slug: string;
  };
}

const OrganizationEditForm = ({ organization }: OrganizationEditFormProps) => {
  const [actionState, action] = useActionState(
    updateOrganization.bind(null, organization.slug),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="name">Name</Label>
      <Input name="name" placeholder="Name" defaultValue={organization.name} />
      <FieldError actionState={actionState} name="name" />

      <Label htmlFor="slug">Slug</Label>
      <Input name="slug" placeholder="Slug" defaultValue={organization.slug} />
      <FieldError actionState={actionState} name="slug" />

      <SubmitButton label="Update" />
    </Form>
  );
};

export { OrganizationEditForm };
