"use server";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { auth } from "@/lib/auth/auth";
import { setCookie } from "@/lib/cookies";
import { toActionState } from "@/lib/form/forms";
import { headers } from "next/headers";

export const leaveOrganization = async (organizationSlug: string) => {
  await getAuthSessionOrRedirect();
  const org = await auth.api.getFullOrganization({
    headers: await headers(),
    query: {
      organizationSlug,
    },
  });
  await auth.api.leaveOrganization({
    headers: await headers(),
    body: {
      organizationId: org?.id ?? "",
    },
  });

  await setCookie("revalidate-auth", "true");
  return toActionState("SUCCESS", "Left Organization");
};
