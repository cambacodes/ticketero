"use server";

import { auth } from "@/lib/auth";
import { setCookie } from "@/lib/cookies";
import { fromErrorToActionState, type ActionState } from "@/lib/form/forms";
import { ticketsPath } from "@/routes";
import { redirect } from "next/navigation";
import z from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  let username: string;
  try {
    const data = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const user = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    username = user.user.name;
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  await setCookie("toast", `Signed In as ${username}`);
  redirect(ticketsPath());
  //   return toActionState("SUCCESS", "Signed In");
};
