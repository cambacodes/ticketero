"use server";

import { auth } from "@/lib/auth/auth";
import { setCookie } from "@/lib/cookies";
import { signInPath } from "@/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  await setCookie("revalidate-auth", "true");
  redirect(signInPath());
};
