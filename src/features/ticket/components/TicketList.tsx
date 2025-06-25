import Placeholder from "@/components/PlaceHolder";
import { SortSelect } from "@/components/SortSelect";
import type { ParsedSearchParams } from "@/lib/searchParams";

import { getTickets } from "../queries/getTickets";
import TicketItem from "./TicketItem";
import TicketPagination from "./TicketPagination";
import TicketSearchInput from "./TicketSearchInput";

type TicketListProps = {
  userId?: string;
  searchParams?: ParsedSearchParams;
};
export default async function TicketList({
  userId,
  searchParams,
}: TicketListProps) {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(
    userId,
    searchParams
  );
  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInput placeholder="Search for a ticket" />
        <SortSelect
          options={[
            { label: "Created at", sortKey: "createdAt" },
            { label: "Bounty", sortKey: "bounty" },
            { label: "Title", sortKey: "title" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
      <div className="w-full max-w-[420px] bg-">
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  );
}
