import { Button } from "@/components/ui/button";
import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { pending: isPending } = useFormStatus();
  return (
    <Button type="submit" disabled={isPending} className={className}>
      {isPending && <LucideLoaderCircle className="mr-2 size-4 animate-spin" />}
      {label}
    </Button>
  );
}
