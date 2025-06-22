"use server";

import { cookies } from "next/headers";

export const getCookie = async (key: string) => {
  const cookie = (await cookies()).get(key);

  if (!cookie) return null;

  return cookie?.value;
};

export const setCookie = async (key: string, value: string) => {
  (await cookies()).set(key, value);
};

export const deleteCookie = async (key: string) => {
  (await cookies()).delete(key);
};
