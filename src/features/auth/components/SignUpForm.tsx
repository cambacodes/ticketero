"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/lib/form/forms";

import { signUp, type SignUpSchema } from "../actions/signUp";

export default function SignUpForm() {
  const [actionState, formAction] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <Form actionState={actionState} action={formAction}>
      <Label htmlFor="username"> Username</Label>
      <Input
        id="username"
        name="username"
        placeholder="johndoe"
        defaultValue={actionState.payload?.get("username") as string}
      />

      <FieldError<SignUpSchema> actionState={actionState} name="username" />

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="johndoe@example.com"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError<SignUpSchema> actionState={actionState} name="email" />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="min. 6 characters"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError<SignUpSchema> actionState={actionState} name="password" />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="********"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError<SignUpSchema>
        actionState={actionState}
        name="confirmPassword"
      />

      <SubmitButton className="mt-4" label="Sign Up" />
    </Form>
  );
}
