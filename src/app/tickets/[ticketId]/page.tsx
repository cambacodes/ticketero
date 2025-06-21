import TicketItem from "@/features/ticket/components/TicketItem";
import { getTicket } from "@/features/ticket/queries/getTicket";
import { notFound } from "next/navigation";

type TicketPageProps = { params: { ticketId: string } };

export default async function TicketPage({ params }: TicketPageProps) {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
}
