"use server";

import { cache } from "react";

import { getOrganizationsByUser } from "@/features/organization/queries/getOrganizationsByUser";
import { auth } from "@/lib/auth/auth";
import { onboardingPath, signInPath } from "@/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganizations?: boolean;
};

export const getAuthSessionOrThrow = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not authenticated");
  }

  return session;
});

export const getAuthSessionOrRedirect = cache(
  async (options?: GetAuthOrRedirectOptions) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect(signInPath());
    }

    if (options?.checkOrganizations) {
      const organizations = await getOrganizationsByUser();

      if (!organizations.length) {
        redirect(onboardingPath());
      }
    }

    return session;
  }
);
