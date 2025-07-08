"use server";

import { getAuthSessionOrThrow } from "@/features/auth/actions/getAuth";
import { auth } from "@/lib/auth/auth";
import { fromErrorToActionState, toActionState } from "@/lib/form/forms";
import { headers } from "next/headers";

export const deleteOrganization = async (organizationSlug: string) => {
  try {
    await getAuthSessionOrThrow();

    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
      query: {
        organizationSlug,
      },
    });

    await auth.api.deleteOrganization({
      headers: await headers(),

      body: {
        organizationId: organization?.id ?? "",
      },
    });
  } catch (e) {
    return fromErrorToActionState(e, undefined);
  }

  return toActionState("SUCCESS", "Organization Deleted");
};
