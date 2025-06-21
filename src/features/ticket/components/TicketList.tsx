import { getTickets } from "../queries/getTickets";
import TicketItem from "./TicketItem";

export default async function TicketList() {
  const tickets = await getTickets();
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
