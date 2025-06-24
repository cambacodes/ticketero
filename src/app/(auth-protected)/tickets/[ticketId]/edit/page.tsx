import { BreadCrumbs } from "@/components/Breadcrumbs";
import CardCompact from "@/components/CardCompact";
import { Separator } from "@/components/ui/separator";
import TicketUpsertForm from "@/features/ticket/components/TicketUpsertForm";
import { getTicket } from "@/features/ticket/queries/getTicket";
import { ticketPath } from "@/routes";
import { notFound } from "next/navigation";

type Params = Promise<{ ticketId: string }>;

export default async function TicketEditPage(props: { params: Params }) {
  const params = await props.params;
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <BreadCrumbs
        breadcrumbs={[
          { title: "Tickets", href: "/tickets" },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "Edit" },
        ]}
      />
      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          className="w-full max-w-[420px] animate-fade-from-top"
          title="Edit Ticket"
          description="Edit your ticket"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
}
