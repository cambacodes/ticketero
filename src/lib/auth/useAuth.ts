import React from "react";

import { usePathname } from "next/navigation";

import { deleteCookie, getCookie } from "../cookies";
import { authClient } from "./auth-client";

export const useAuth = () => {
  const { data, ...sessionData } = authClient.useSession();
  const pathName = usePathname();

  React.useEffect(() => {
    const handleRevalidate = async () => {
      const shouldRevalidate = await getCookie("revalidate-auth");
      if (shouldRevalidate) {
        sessionData.refetch();
        void deleteCookie("revalidate-auth");
      }
    };
    void handleRevalidate();
  }, [sessionData, pathName]);

  return { session: data?.session, user: data?.user, ...sessionData };
};
