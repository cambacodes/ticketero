import { attachmentDeleteEvent } from "@/features/attachments/events/attachmentDeleteEvent";
import { passwordResetEvent } from "@/features/auth/events/eventPasswordReset";
import { inngest } from "@/lib/inngest";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [passwordResetEvent, attachmentDeleteEvent],
});
