import Placeholder from "@/components/PlaceHolder";
import { Button } from "@/components/ui/button";
import { organizationsPath } from "@/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder
      label="Organization not found"
      button={
        <Button asChild variant="outline">
          <Link href={organizationsPath()}>Go to Organizations</Link>
        </Button>
      }
    />
  );
}
