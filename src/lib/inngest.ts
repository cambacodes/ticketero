import { env } from "@/env";
import type { AttachmentDeleteFunctionSchema } from "@/features/attachments/events/attachmentDeleteEvent";
import type { PasswordResetFunctionSchema } from "@/features/auth/events/eventPasswordReset";
import { EventSchemas, Inngest } from "inngest";

type Events = {
  "app/password.password-reset": PasswordResetFunctionSchema;
  "app/attachment.delete": AttachmentDeleteFunctionSchema;
  //   "app/auth.sign-up": EmailVerificationFunctionArgs;
};

export const inngest = new Inngest({
  id: env.INNGEST_ID,
  schemas: new EventSchemas().fromRecord<Events>(),
});
