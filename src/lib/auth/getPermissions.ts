import { headers } from "next/headers";

import { auth } from "./auth";
import { type PermissionAction, type PermissionResource } from "./permissions";

export const getPermissions = async <
  R extends PermissionResource,
  A extends PermissionAction<R>,
>(
  permission: R,
  action: A,
  organizationId?: string
): Promise<boolean> => {
  const { success } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      organizationId,
      permissions: { [permission]: [action] },
    },
  });
  return success;
};
