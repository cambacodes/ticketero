import { Suspense } from "react";

import CardCompact from "@/components/CardCompact";
import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import TicketList from "@/features/ticket/components/TicketList";
import TicketUpsertForm from "@/features/ticket/components/TicketUpsertForm";

const TicketsPage = async () => {
  const { user } = await getAuthSessionOrRedirect();
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
        <TicketList userId={user.id} />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
