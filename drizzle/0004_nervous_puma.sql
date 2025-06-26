CREATE TABLE "ticketero_comment" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "content" text NOT NULL,
  "author_id" text NOT NULL,
  "ticket_id" uuid NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "ticketero_user"("id") ON DELETE CASCADE,
  CONSTRAINT "comment_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticketero_ticket"("id") ON DELETE CASCADE
);