"use server";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { auth } from "@/lib/auth/auth";
import { setCookie } from "@/lib/cookies";
import { headers } from "next/headers";

export const switchActiveOrganization = async (organizationSlug: string) => {
  await getAuthSessionOrRedirect();
  try {
    await auth.api.setActiveOrganization({
      headers: await headers(),
      body: {
        organizationSlug,
      },
    });
  } catch (e) {
    console.error(e);
    await setCookie("toast", "Something went wrong");
  }

  await setCookie("revalidate-auth", "true");
};
