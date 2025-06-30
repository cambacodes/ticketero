import { passwordResetPath } from "@/routes";

import { getBaseUrl } from "./getBaseUrl";

export const generatePasswordResetLink = (token: string) => {
  return `${getBaseUrl()}${passwordResetPath()}/${token}`;
};
