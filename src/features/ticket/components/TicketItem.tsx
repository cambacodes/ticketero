import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSessionOrRedirect } from "@/features/auth/actions/getAuth";
import { toCurrencyFromCent } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/routes";
import { LucideArrowUpRightFromSquare } from "lucide-react";

import { TICKET_ICONS } from "../constants";
import type { TicketWithAuthor } from "../types";
import { TicketButton } from "./TicketButton";
import TicketMoreMenu from "./TicketMoreMenu";

type TicketItemProps = {
  ticket: TicketWithAuthor;
  isDetail?: boolean;
  comments?: React.ReactNode;
  attachments?: React.ReactNode;
};

export default async function TicketItem({
  ticket,
  isDetail,
  comments,
  attachments,
}: TicketItemProps) {
  const { user } = await getAuthSessionOrRedirect();

  const isOwner = user?.id === ticket.author?.id;
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-y-4",
        isDetail ? "max-w-[580px]" : "max-w-[420px]"
      )}
    >
      <div className="flex gap-x-2">
        <Card key={ticket.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2 items-center">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={cn("whitespace-break-spaces", {
                "line-clamp-3": isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex flex-col gap-1">
            <div className="flex justify-between w-full">
              <span className="text-sm text-muted-foreground">
                {ticket.deadline.toISOString().slice(0, 10)}
              </span>
              <span className="text-sm text-muted-foreground">
                {toCurrencyFromCent(ticket.bounty)}
              </span>
            </div>
            <div className="flex w-full justify-end text-xs text-muted-foreground">
              {ticket.author?.name}
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            isOwner && (
              <>
                <TicketButton href={ticketEditPath(ticket.id)} />
                <TicketMoreMenu ticket={ticket} />
              </>
            )
          ) : (
            <>
              <TicketButton
                href={ticketPath(ticket.id)}
                icon={<LucideArrowUpRightFromSquare />}
              />
              {isOwner && <TicketButton href={ticketEditPath(ticket.id)} />}
            </>
          )}
        </div>
      </div>
      {attachments}
      {comments}
    </div>
  );
}
