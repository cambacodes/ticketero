import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { auth } from "@/lib/auth/auth";
import { headers as nextHeaders } from "next/headers";

export const getOrganizationsByUser = async () => {
  await getAuthSessionOrRedirect();
  const headers = await nextHeaders();

  const listOrganizations = await auth.api.listOrganizations({
    headers,
  });

  const organizations = [];
  for (const organization of listOrganizations) {
    organizations.push(
      await auth.api.getFullOrganization({
        headers,
        query: {
          organizationSlug: organization.slug,
        },
      })
    );
  }

  return organizations;
};
