import PlaceHolder from "@/components/PlaceHolder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/routes";
import Link from "next/link";

type TicketPageProps = { ticketId: string };

export default function TicketPage({}: TicketPageProps) {
  const ticket = false;

  if (!ticket) {
    return (
      <PlaceHolder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go to Tickets</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div>
      <h2 className="text-lg">Ticket</h2>
      <p className="text-sm">Content</p>
    </div>
  );
}
