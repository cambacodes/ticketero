import { cloneElement } from "react";

import { Button } from "@/components/ui/button";
import { LucidePencil, type LucideProps } from "lucide-react";
import Link from "next/link";

type TicketButtonProps = {
  href?: string;
  icon?: React.ReactElement;
  buttonText?: string;
} & React.ComponentProps<typeof Button>;
export function TicketButton({
  href,
  icon = <LucidePencil />,
  children,
  ...butonProps
}: TicketButtonProps) {
  return (
    <Button
      className="cursor-pointer"
      variant="outline"
      size="icon"
      asChild={Boolean(href)}
      {...butonProps}
    >
      {href ? (
        <Link prefetch href={href}>
          {cloneElement(icon, { className: "size-4" } as LucideProps)}
        </Link>
      ) : (
        <>
          {cloneElement(icon, { className: "size-4" } as LucideProps)}
          {children}
        </>
      )}
    </Button>
  );
}
