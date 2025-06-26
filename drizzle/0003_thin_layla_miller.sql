ALTER TABLE "ticket" RENAME TO "ticketero_ticket";
ALTER TABLE "user" RENAME TO "ticketero_user";
ALTER TABLE "account" RENAME TO "ticketero_account";
ALTER TABLE "session" RENAME TO "ticketero_session";
ALTER TABLE "verification" RENAME TO "ticketero_verification";
--> statement-breakpoint

ALTER TABLE "ticketero_ticket" DROP CONSTRAINT "ticket_authorId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "ticketero_ticket" ADD CONSTRAINT "ticketero_ticket_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."ticketero_user"("id") ON DELETE cascade ON UPDATE no action;