import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { auth } from "@/lib/auth/auth";
import { headers as nextHeaders } from "next/headers";

export const getOrganization = async (organizationSlug: string) => {
  await getAuthSessionOrRedirect();
  const headers = await nextHeaders();

  return await auth.api.getFullOrganization({
    headers,
    query: {
      organizationSlug,
    },
  });
};
