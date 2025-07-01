import { env } from "@/env";
import type { PasswordResetFunctionSchema } from "@/features/auth/events/eventPasswordReset";
import { EventSchemas, Inngest } from "inngest";

type Events = {
  "app/password.password-reset": PasswordResetFunctionSchema;
  //   "app/auth.sign-up": EmailVerificationFunctionArgs;
};

export const inngest = new Inngest({
  id: env.INNGEST_ID,
  schemas: new EventSchemas().fromRecord<Events>(),
});
