import { cache } from "react";

import { auth } from "@/lib/auth";
import { signInPath } from "@/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getAuthSessionOrThrow = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not authenticated");
  }

  return session;
});

export const getAuthSessionOrRedirect = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(signInPath());
  }

  return session;
});
