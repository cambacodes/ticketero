import { BreadCrumbs } from "@/components/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import Attachments from "@/features/attachments/components/Attachments";
import { Comments } from "@/features/comment/component/Comments";
import { getComments } from "@/features/comment/queries/getComments";
import TicketItem from "@/features/ticket/components/TicketItem";
import { getTicket } from "@/features/ticket/queries/getTicket";
import { notFound } from "next/navigation";

type Params = Promise<{ ticketId: string }>;

export default async function TicketPage(props: { params: Params }) {
  const params = await props.params;
  const ticketPromise = getTicket(params.ticketId);
  const commentsPromise = getComments(params.ticketId);

  const [ticket, paginatedComments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <BreadCrumbs
        breadcrumbs={[
          { title: "Tickets", href: "/tickets" },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-from-top">
        <TicketItem
          ticket={ticket}
          isDetail
          attachments={<Attachments ticketId={ticket.id} isOwner />}
          comments={
            <Comments
              ticketId={ticket.id}
              paginatedComments={paginatedComments}
            />
          }
        />
      </div>
    </div>
  );
}
