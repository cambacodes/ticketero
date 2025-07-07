"use server";

import { auth } from "@/lib/auth/auth";
import {
  fromErrorToActionState,
  toActionState,
  type ActionState,
} from "@/lib/form/forms";
import z from "zod";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine((str) => !str.includes(" "), { message: "No spaces allowed" }),
    email: z.string().email(),
    password: z.string().min(1).max(191),
    confirmPassword: z.string().min(1).max(191),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const data = signUpSchema.parse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    await auth.api.signUpEmail({
      body: {
        name: data.username,
        email: data.email,
        password: data.password,
      },
    });
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  return toActionState("SUCCESS", "Signed Up");
};
