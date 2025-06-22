import TicketItem from "@/features/ticket/components/TicketItem";
import { getTicket } from "@/features/ticket/queries/getTicket";
import { notFound } from "next/navigation";

type Params = Promise<{ ticketId: string }>;

export default async function TicketPage(props: { params: Params }) {
  const params = await props.params;
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
