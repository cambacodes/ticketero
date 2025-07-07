import { env } from "@/env";
import { db } from "@/server/db";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";

import { generatePasswordResetLink } from "../generatePasswordResetLink";
import { ac, admin, user } from "./permissions";

export const config = {
  plugins: [
    organization({
      ac,
      roles: {
        user,
        admin,
      },
    }),
    nextCookies(),
  ],
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
} satisfies BetterAuthOptions;

export const auth = betterAuth(config);
export type Session = typeof auth.$Infer.Session;
