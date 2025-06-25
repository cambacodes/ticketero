import Placeholder from "@/components/PlaceHolder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Button asChild variant="outline">
          <Link href={ticketsPath()}>Go to Tickets</Link>
        </Button>
      }
    />
  );
}
