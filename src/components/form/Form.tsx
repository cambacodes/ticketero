import React from "react";

import type { ActionState } from "@/lib/form/forms";
import useActionFeedback from "@/lib/form/useActionFeedback";
import { toast } from "sonner";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

export default function Form({
  action,
  actionState,
  onSuccess,
  onError,
  children,
}: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: (actionState) => {
      onSuccess?.(actionState);
      if (!actionState.message) return;
      toast.success(actionState.message);
    },
    onError: (actionState) => {
      onError?.(actionState);
      if (!actionState.message) return;
      toast.success(actionState.message);
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}
