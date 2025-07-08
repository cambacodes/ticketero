import React from "react";

import { authClient } from "./auth-client";

export const useAuth = () => {
  const { data, ...sessionData } = authClient.useSession();

  React.useEffect(() => {
    const checkRevalidate = async () => {
      const value = document.cookie
        .split("; ")
        .find((row) => row.startsWith("revalidate-auth="));
      if (value) {
        sessionData.refetch();
        document.cookie =
          "revalidate-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    };

    void checkRevalidate();
  }, [sessionData]);

  return { session: data?.session, user: data?.user, ...sessionData };
};
