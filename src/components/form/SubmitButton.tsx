"use client";

import { cloneElement } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideLoader2, type LucideProps } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  label,
  icon,
  className,
  ...props
}: {
  label: string;
  icon?: React.ReactElement;
  className?: string;
} & React.ComponentProps<typeof Button>) {
  const { pending: isPending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={cn("gap-0", className)}
      {...props}
    >
      {isPending && (
        <LucideLoader2
          className={cn("size-4 animate-spin", {
            "mr-2": !!label,
          })}
        />
      )}

      {label}

      {isPending ? null : icon ? (
        <span className={cn({ "pl-2": !!label })}>
          {cloneElement(icon, { className: "size-4" } as LucideProps)}
        </span>
      ) : null}
    </Button>
  );
}
