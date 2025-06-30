"use server";

import { auth } from "@/lib/auth";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import { db } from "@/server/db";

import { emailSchema } from "../schema";

export const passwordForgot = async (
  _actionState: ActionState,
  formData: FormData
) => {
  const message =
    "If your email is registered with us, you'll receive a password reset link shortly.";
  try {
    const email = emailSchema.parse(formData.get("email"));
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!user) {
      return toActionState("SUCCESS", message, formData);
    }

    await auth.api.requestPasswordReset({
      body: {
        email,
      },
    });

    // await inngest.send({
    //   name: "app/password.password-reset",
    //   data: { userId: user.id },
    // });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", message, formData);
};
