import { cache } from "react";

import { auth } from "@/lib/auth";
import { signInPath } from "@/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getAuthSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(signInPath());
  }

  return session;
});
