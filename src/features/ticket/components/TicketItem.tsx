import { cloneElement } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toCurrencyFromCent } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { ticketEditPath, ticketPath } from "@/routes";
import {
  LucideArrowUpRightFromSquare,
  LucidePencil,
  type LucideProps,
} from "lucide-react";
import Link from "next/link";

import { TICKET_ICONS } from "../constants";
import type { Ticket } from "../types";
import TicketMoreMenu from "./TicketMoreMenu";

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
        <CardFooter className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            {ticket.deadline.toISOString().slice(0, 10)}
          </span>
          <span className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </span>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            <TicketButton href={ticketEditPath(ticket.id)} />
            <TicketMoreMenu ticket={ticket} />
          </>
        ) : (
          <>
            <TicketButton
              href={ticketPath(ticket.id)}
              icon={<LucideArrowUpRightFromSquare />}
            />
            <TicketButton href={ticketEditPath(ticket.id)} />
          </>
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
export function TicketButton({
  href,
  icon = <LucidePencil />,
  children,
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
        <>
          {cloneElement(icon, { className: "size-4" } as LucideProps)}
          {children}
        </>
      )}
    </Button>
  );
}
