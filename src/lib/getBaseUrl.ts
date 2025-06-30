import { env } from "@/env";

export const getBaseUrl = () => {
  if (env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
};
