import React from "react";

import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";

type AuthLayoutProps = { children: React.ReactNode };

export default async function AuthLayout({ children }: AuthLayoutProps) {
  await getAuthSessionOrRedirect();

  return <>{children}</>;
}
