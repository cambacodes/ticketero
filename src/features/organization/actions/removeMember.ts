"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function removeMember({
  organizationId,
  memberId,
}: {
  organizationId: string;
  memberId: string;
}) {
  return await auth.api.removeMember({
    headers: await headers(),
    body: { organizationId, memberIdOrEmail: memberId },
  });
}
