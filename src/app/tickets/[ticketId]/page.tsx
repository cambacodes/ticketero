import TicketItem from "@/features/ticket/TicketItem";
import { notFound } from "next/navigation";

type TicketPageProps = { ticketId: string };

export default function TicketPage({}: TicketPageProps) {
  const ticket = false;

  if (!ticket) {
    notFound();
  }
  
  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
}
