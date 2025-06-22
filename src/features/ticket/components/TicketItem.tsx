import { cloneElement } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ticketPath } from "@/routes";
import {
  LucideArrowUpRightFromSquare,
  LucidePencil,
  LucideTrash,
  type LucideProps,
} from "lucide-react";
import Link from "next/link";

import { deleteTicket } from "../actions/deleteTicket";
import { TICKET_ICONS } from "../constants";
import type { Ticket } from "../types";

type TicketItemProps = { ticket: Ticket; isDetail?: boolean };

export default function TicketItem({ ticket, isDetail }: TicketItemProps) {
  return (
    <div
      className={cn(
        "w-full flex gap-x-1",
        isDetail ? "max-w-[580px]" : "max-w-[420px]"
      )}
    >
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
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <form action={deleteTicket.bind(null, ticket.id)}>
            <TicketButton icon={<LucideTrash />} />
          </form>
        ) : (
          <TicketButton
            href={ticketPath(ticket.id)}
            icon={<LucideArrowUpRightFromSquare />}
          />
        )}
      </div>
    </div>
  );
}

type TicketButtonProps = {
  href?: string;
  icon?: React.ReactElement;
  buttonText?: string;
} & React.ComponentProps<typeof Button>;
function TicketButton({
  href,
  icon = <LucidePencil />,
  children: _,
  ...butonProps
}: TicketButtonProps) {
  return (
    <Button
    className="cursor-pointer"
      variant="outline"
      size="icon"
      asChild={Boolean(href)}
      {...butonProps}
    >
      {href ? (
        <Link prefetch href={href}>
          {cloneElement(icon, { className: "size-4" } as LucideProps)}
        </Link>
      ) : (
        cloneElement(icon, { className: "size-4" } as LucideProps)
      )}
    </Button>
  );
}
