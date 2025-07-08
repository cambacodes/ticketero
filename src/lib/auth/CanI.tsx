import React from "react";

import { authClient } from "./auth-client";
import { type PermissionAction, type PermissionResource } from "./permissions";

type CanIProps<R extends PermissionResource, A extends PermissionAction<R>> = {
  permission: R;
  action: A;
  organizationId?: string;
  role?: "owner" | "admin" | "user";
  children: React.ReactNode;
};

export function CanI<
  R extends PermissionResource,
  A extends PermissionAction<R>,
>({ permission, action, organizationId, role, children }: CanIProps<R, A>) {
  const [allowed, setAllowed] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState<unknown>(null);

  React.useEffect(() => {
    setAllowed(null);
    setError(null);

    if (role) {
      const result = authClient.organization.checkRolePermission({
        role,
        permissions: { [permission]: [action] },
      });
      setAllowed(result ?? false);
      return;
    }

    authClient.organization
      .hasPermission({
        organizationId,
        permissions: { [permission]: [action] },
      })
      .then((result) => {
        setAllowed(result.data?.success ?? false);
      })
      .catch((err: unknown) => {
        setError(err);
      });
  }, [permission, action, organizationId, role]);

  if (error || !allowed || allowed === null) return null;
  return <>{children}</>;
}
