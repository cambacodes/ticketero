import { SortSelect } from "@/components/SortSelect";
import type { ParsedSearchParams } from "@/lib/searchParams";

import { getTickets } from "../queries/getTickets";
import TicketItem from "./TicketItem";
import TicketSearchInput from "./TicketSearchInput";

type TicketListProps = {
  userId?: string;
  searchParams?: ParsedSearchParams;
};
export default async function TicketList({
  userId,
  searchParams,
}: TicketListProps) {
  const tickets = await getTickets(userId, searchParams);
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
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
