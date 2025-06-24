ALTER TABLE "ticket" RENAME TO "ticketero_ticket";--> statement-breakpoint
ALTER TABLE "ticketero_ticket" DROP CONSTRAINT "ticket_authorId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ticketero_ticket" ADD CONSTRAINT "ticketero_ticket_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;