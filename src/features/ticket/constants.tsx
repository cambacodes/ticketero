import { LucideCheckCircle, LucideFileText, LucidePencil } from "lucide-react";

import type { Ticket, TicketStatusLabel } from "./types";

export const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCheckCircle />,
  IN_PROGRESS: <LucidePencil />,
};

export const TICKET_STATUS_LABELS: Record<Ticket["status"], TicketStatusLabel> =
  {
    OPEN: "Open",
    DONE: "Done",
    IN_PROGRESS: "In Progress",
  };
