"use server";

import { getAuthSessionOrThrow } from "@/features/auth/actions/getAuth";
import { auth } from "@/lib/auth/auth";
import { setCookie } from "@/lib/cookies";
import { fromErrorToActionState, type ActionState } from "@/lib/form/forms";
import { organizationsPath } from "@/routes";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const updateOrganizationSchema = z.object({
  name: z.string().min(1).max(191),
  slug: z.string().min(1).max(191),
});

export const updateOrganization = async (
  organizationSlug: string,
  _actionState: ActionState,
  formData: FormData
) => {
  try {
    await getAuthSessionOrThrow();
    const data = updateOrganizationSchema.parse({
      name: formData.get("name"),
      slug: formData.get("slug"),
    });

    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
      query: {
        organizationSlug,
      },
    });

    await auth.api.updateOrganization({
      headers: await headers(),
      body: {
        organizationId: organization?.id ?? "",
        data: {
          name: data.name,
          slug: data.slug,
        },
      },
    });
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  revalidatePath(organizationsPath());
  await setCookie("toast", "Organization Updated");
  redirect(organizationsPath());
};
