"use server";

import { auth } from "@/lib/auth";
import { signInPath } from "@/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect(signInPath());
};
