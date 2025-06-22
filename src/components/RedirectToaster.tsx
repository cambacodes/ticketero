"use client";

import React from "react";

import { deleteCookie, getCookie } from "@/lib/cookies";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function RedirectToaster() {
  const pathname = usePathname();

  // We are using pathname to trigger re-renders because templates are bugged
  React.useEffect(() => {
    const handleRediectToast = async () => {
      const message = await getCookie("toast");
      if (message) {
        toast.success(message);
      }
      await deleteCookie("toast");
    };
    void handleRediectToast();
  }, [pathname]);

  return null;
}
