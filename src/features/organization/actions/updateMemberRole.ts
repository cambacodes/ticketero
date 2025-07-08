"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

import type { MemberRole } from "../types";

export async function updateMemberRole({
  organizationId,
  memberId,
  role,
}: {
  organizationId: string;
  memberId: string;
  role: MemberRole;
}) {
  return await auth.api.updateMemberRole({
    headers: await headers(),
    body: { organizationId, memberId: memberId, role },
  });
}
