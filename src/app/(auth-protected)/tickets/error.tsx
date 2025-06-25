"use client";

import Placeholder from "@/components/PlaceHolder";

export default function Error({ error }: { error: Error }) {
  return <Placeholder label={error.message || "Something went wrong"} />;
}
