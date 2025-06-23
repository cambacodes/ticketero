"use client";

import { useActionState } from "react";

import FieldError from "@/components/form/FieldError";
import Form from "@/components/form/Form";
import SubmitButton from "@/components/form/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/lib/form/forms";

import { signIn } from "../actions/signIn";
import { type SignUpSchema } from "../actions/signUp";

export default function SignInForm() {
  const [actionState, formAction] = useActionState(signIn, EMPTY_ACTION_STATE);
  return (
    <Form actionState={actionState} action={formAction}>
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

      <SubmitButton className="mt-4" label="Sign Up" />
    </Form>
  );
}
