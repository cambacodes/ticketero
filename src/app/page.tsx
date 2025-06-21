import Heading from "@/components/Heading";
import { ticketsPath } from "@/routes";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Welcome" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="text-sm underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
}
