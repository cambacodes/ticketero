import type { ActionState } from "@/lib/form/forms";

type FieldErrorProps<T> = {
  actionState: ActionState;
  name: keyof T;
};

export default function FieldError<T extends object>(
  props: FieldErrorProps<T>
) {
  const { actionState, name } = props;

  const error = actionState.fieldErrors?.[name as string]?.at(0);

  if (!error) {
    return null;
  }

  return <span className="text-xs text-red-500">{error}</span>;
}
