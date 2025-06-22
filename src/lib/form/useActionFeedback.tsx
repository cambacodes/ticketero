import React from "react";

import type { ActionState } from "./forms";

type UseActionFeedbackOptions = {
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

export default function useActionFeedback(
  actionState: ActionState,
  options: UseActionFeedbackOptions
) {
  const previousTimpestamp = React.useRef(actionState.timestamp);
  const shouldUpdate = actionState.timestamp !== previousTimpestamp.current;

  React.useEffect(() => {
    if (!shouldUpdate) {
      return;
    }

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.(actionState);
    }
    if (actionState.status === "ERROR") {
      options.onError?.(actionState);
    }

    previousTimpestamp.current = actionState.timestamp;
  }, [actionState, options, shouldUpdate]);
}
