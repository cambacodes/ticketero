"use server";

import { auth } from "@/lib/auth/auth";
import { setCookie } from "@/lib/cookies";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { signInPath } from "@/routes";
import { redirect } from "next/navigation";

import { passwordResetSchema } from "../schema";

export const passwordReset = async (
  token: string,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    const data = passwordResetSchema.parse(Object.fromEntries(formData));
    const response = await auth.api.resetPassword({
      body: {
        newPassword: data.password,
        token,
      },
    });

    if (response.status === false) {
      return toActionState("ERROR", "Something went wrong");
    }
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  await setCookie("toast", "Successfully reset password");
  redirect(signInPath());
};
