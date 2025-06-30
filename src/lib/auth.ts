import { env } from "@/env";
import { db } from "@/server/db";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { generatePasswordResetLink } from "./generatePasswordResetLink";

export const config: BetterAuthOptions = {
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    sendResetPassword: async ({ token }) => {
      console.log(
        "🚀 ~ sendResetPassword: ~ url:",
        generatePasswordResetLink(token)
      );
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  plugins: [nextCookies()],
} satisfies BetterAuthOptions;

export const auth = betterAuth(config);
export type Session = typeof auth.$Infer.Session;
