"use client";

import React from "react";

import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function RedirectToaster() {
  const pathname = usePathname();

  // We are using pathname to trigger re-renders because templates are bugged
  React.useEffect(() => {
    const handleRedirectToast = () => {
      const cookieString = document.cookie;
      const match = cookieString
        .split("; ")
        .find((row) => row.startsWith("toast="));

      if (match) {
        const message = decodeURIComponent(match.split("=")[1] ?? "");
        if (message) {
          toast.success(message);
        }

        document.cookie =
          "toast=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    };

    handleRedirectToast();
  }, [pathname]);

  return null;
}
