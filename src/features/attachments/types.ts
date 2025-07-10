import type { attachment, comment, ticket } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type Attachment = InferSelectModel<typeof attachment>;
type Ticket = InferSelectModel<typeof ticket>;
type Comment = InferSelectModel<typeof comment>;
export type AttachmentEntity = {
  entityId: string;
  entity: Attachment["entity"];
};

export type TicketAttachmentSubject = {
  entity: "TICKET";
  ticket: Pick<Ticket, "authorId" | "organizationId">;
  comment?: never;
  isOwner: boolean;
  organizationId: string;
};

export type CommentAttachmentSubject = {
  entity: "COMMENT";
  comment: {
    authorId: string;
    ticket: Pick<Ticket, "organizationId">;
  };
  ticket?: never;
  isOwner: boolean;
  organizationId: string;
};

export type AttachmentSubject =
  | TicketAttachmentSubject
  | CommentAttachmentSubject;
