import React from "react";

import { type auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { type BetterAuthError } from "better-auth";
import { usePathname } from "next/navigation";

type AuthData = Awaited<ReturnType<(typeof auth)["api"]["getSession"]>>;

export default function useAuth() {
  const [authData, setAuthData] = React.useState<AuthData>(null);
  const [isPending, setIsPending] = React.useState<boolean>(true);
  const [error, setError] = React.useState<BetterAuthError>();
  const pathname = usePathname();

  React.useEffect(() => {
    const fetchSession = async () => {
      try {
        const auth = await authClient.getSession();
        setAuthData(auth.data);
      } catch (error) {
        console.error("Error fetching session:", error);
        setError(error as BetterAuthError);
        setAuthData(null);
      } finally {
        setIsPending(false);
      }
    };

    void fetchSession();
  }, [pathname]);

  return {
    session: authData?.session,
    user: authData?.user,
    isPending,
    error,
  };
}
