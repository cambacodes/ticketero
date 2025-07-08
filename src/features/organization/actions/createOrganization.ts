"use server";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { auth } from "@/lib/auth/auth";
import { setCookie } from "@/lib/cookies";
import { fromErrorToActionState, type ActionState } from "@/lib/form/forms";
import { organizationsPath } from "@/routes";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(191),
});

export const createOrganization = async (
  _actionState: ActionState,
  formData: FormData
) => {
  await getAuthSessionOrRedirect({
    checkOrganizations: false,
  });

  try {
    const data = createOrganizationSchema.parse({
      name: formData.get("name"),
    });

    await auth.api.createOrganization({
      headers: await headers(),
      body: {
        name: data.name,
        slug: data.name.toLowerCase().replace(" ", "-"),
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookie("toast", "Organization created successfully");
  redirect(organizationsPath());
};
