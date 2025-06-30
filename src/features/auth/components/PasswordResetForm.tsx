"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/lib/form/forms";

import { passwordReset } from "../actions/passwordReset";

export const PasswordResetForm = ({ token }: { token: string }) => {
  const [actionState, action] = useActionState(
    passwordReset.bind(null, token),
    EMPTY_ACTION_STATE
  );
  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="min. 6 characters"
      />
      <FieldError actionState={actionState} name="password" />
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="min. 6 characters"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton className="mt-4" label="Reset Password" />
    </Form>
  );
};
