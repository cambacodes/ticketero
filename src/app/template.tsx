import React from "react";

import RedirectToaster from "@/components/RedirectToaster";

type RootTemplateProps = { children: React.ReactNode };

export default function RootTemplate({ children }: RootTemplateProps) {
  return (
    <>
      <>{children}</>
      <RedirectToaster />
    </>
  );
}
