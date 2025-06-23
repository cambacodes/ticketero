"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideMoreVertical, LucideTrash } from "lucide-react";
import { toast } from "sonner";

import { updateTicketStatus } from "../actions/updateStatus";
import { TICKET_STATUS_LABELS } from "../constants";
import type { Ticket } from "../types";
import { TicketButton } from "./TicketItem";

type TicketMoreMenuProps = {
  ticket: Ticket;
};

export default function TicketMoreMenu({ ticket }: TicketMoreMenuProps) {
  const handleStatusChange = async (status: string) => {
    const promise = updateTicketStatus(ticket.id, status as Ticket["status"]);

    toast.promise(promise, {
      loading: "Updating status...",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
    }
    if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <LucideMoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuRadioGroup
            value={ticket.status}
            onValueChange={handleStatusChange}
          >
            {(Object.keys(TICKET_STATUS_LABELS) as Ticket["status"][]).map(
              (status) => (
                <DropdownMenuRadioItem key={status} value={status}>
                  {TICKET_STATUS_LABELS[status]}
                </DropdownMenuRadioItem>
              )
            )}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <TicketButton
            className="w-full"
            size="default"
            variant="ghost"
            icon={<LucideTrash />}
          >
            Delete
          </TicketButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
