"use server";

import { auth } from "@/lib/auth";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { ZodError } from "zod";

import { passwordChangeSchema } from "../schema";

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const { password, currentPassword } = passwordChangeSchema.parse(
      Object.fromEntries(formData)
    );

    const headerList = await headers();
    await auth.api.changePassword({
      headers: headerList,
      body: {
        currentPassword,
        newPassword: password,
      },
    });
  } catch (e) {
    if (e instanceof APIError && e.message === "Invalid password") {
      const zodError = new ZodError([
        {
          code: "custom",
          message: "Current password is incorrect",
          path: ["currentPassword"],
        },
      ]);
      return fromErrorToActionState(zodError, formData);
    }
    return fromErrorToActionState(e, formData);
  }

  return toActionState("SUCCESS", "Password updated!");
};
