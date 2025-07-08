"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

import type { MemberRole } from "../types";

export async function inviteMember({
  organizationId,
  email,
  role,
}: {
  organizationId: string;
  email: string;
  role: MemberRole;
}) {
  return await auth.api.createInvitation({
    headers: await headers(),
    body: { organizationId, email, role },
  });
}
