import Heading from "@/components/Heading";
import TicketItem from "@/features/ticket/TicketItem";
import type { Ticket } from "@/features/ticket/types";

export const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "Ticket 1",
    content: "This is the first ticket",
    status: "DONE",
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "This is the second ticket",
    status: "OPEN",
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "This is the third ticket",
    status: "IN_PROGRESS",
  },
];

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
