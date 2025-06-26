CREATE TABLE "ticketero_comment_to_comment" (
	"from_comment_id" uuid NOT NULL,
	"to_comment_id" uuid NOT NULL,
	CONSTRAINT "ticketero_comment_to_comment_from_comment_id_to_comment_id_pk" PRIMARY KEY("from_comment_id","to_comment_id")
);
--> statement-breakpoint
ALTER TABLE "ticketero_comment_to_comment" ADD CONSTRAINT "ticketero_comment_to_comment_from_comment_id_ticketero_comment_id_fk" FOREIGN KEY ("from_comment_id") REFERENCES "public"."ticketero_comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticketero_comment_to_comment" ADD CONSTRAINT "ticketero_comment_to_comment_to_comment_id_ticketero_comment_id_fk" FOREIGN KEY ("to_comment_id") REFERENCES "public"."ticketero_comment"("id") ON DELETE cascade ON UPDATE no action;