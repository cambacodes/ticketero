import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message?: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
  timestamp?: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  payload: undefined,
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  payload: FormData | undefined
): ActionState => {
  const timestamp = Date.now();  
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      payload,
      fieldErrors: error.flatten().fieldErrors,
      timestamp,
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      payload,
      timestamp,
    };
  } else {
    return {
      status: "ERROR",
      message: "An unkown error has occurred",
      payload,
      timestamp,
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: ActionState["message"]
): ActionState => {
  return {
    status,
    message,
  };
};
