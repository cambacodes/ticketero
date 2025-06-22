import { Suspense } from "react";

import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import CardCompact from "@/features/ticket/components/CardCompact";
import TicketList from "@/features/ticket/components/TicketList";
import TicketUpsertForm from "@/features/ticket/components/TicketUpsertForm";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <CardCompact
        className="w-full max-w-[420px] self-center"
        title="Create a new ticket"
        description="Create a new ticket"
        content={<TicketUpsertForm />}
      />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
