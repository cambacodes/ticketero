import { cloneElement } from "react";

import { LucideMessageSquareWarning } from "lucide-react";

type PlaceHolderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactElement;
};

export default function Placeholder({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceHolderProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      {cloneElement(icon, { className: "size-16" } as React.ComponentProps<
        typeof LucideMessageSquareWarning
      >)}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-10",
      } as React.ComponentProps<"div">)}
    </div>
  );
}
