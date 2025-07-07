import { auth } from "@/lib/auth/auth";
import { inngest } from "@/lib/inngest";
import { db } from "@/server/db";

export type PasswordResetFunctionSchema = {
  data: {
    userId: string;
  };
};

export const passwordResetEvent = inngest.createFunction(
  {
    id: "password-reset",
  },
  { event: "app/password.password-reset" },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
    });

    if (!user) {
      return;
    }

    await auth.api.requestPasswordReset({
      body: {
        email: user.email,
      },
    });
  }
);
