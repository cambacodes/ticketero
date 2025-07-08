import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac, admin, owner, user } from "./permissions";

export const authClient = createAuthClient({
  plugins: [
    organizationClient({
      ac,
      roles: {
        user,
        admin,
        owner,
      },
    }),
  ],
});

export const useSession = authClient.useSession;
