import { Suspense } from "react";

import Heading from "@/components/Heading";
import Spinner from "@/components/Spinner";
import TicketList from "@/features/ticket/components/TicketList";
import type { ParsedSearchParams } from "@/lib/searchParams";

type HomePageProps = {
  searchParams: ParsedSearchParams;
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All tickets"
        description="All your tickets at one place"
      />
      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
